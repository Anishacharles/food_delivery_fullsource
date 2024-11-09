const Razorpay = require('razorpay');
const dotEnv = require('dotenv');
const Order = require('../models/Order')
const crypto = require('crypto'); 
const User = require('../models/User');    



// Initialize razorpayInstance only once globally
dotEnv.config();
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  // Extract the amount from the request body
  const { amount } = req.body; 
  
  const options = {
    amount: Number(amount), // Amount is already in paise
    currency: 'INR',
    receipt: `order_rcptid_${Date.now()}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
   
    res.json({
      success: true,
      order, 
    });
    const orderId = order.id;
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating the order",
      error: error.message,
    });
  }
};


const updateOrderStatus = async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, status } = req.body;

  try {
    const order = await Order.findOne({ razorpayOrderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    order.razorpayPaymentId = razorpayPaymentId;
    
    await order.save(); // Save the updated order in MongoDB

    res.json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};




// User Orders for Frontend
const userOrder = async (req, res) => {
  try {
      const orders = await Order.find({ userId: req.body.userId });
      res.json({ success: true, data: orders })
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
  }
}






// Razorpay Webhook endpoint
const paymentSucess= async (req, res) => {
  const paymentDetails = req.body; 

  const orderId = paymentDetails.payload.payment.entity.order_id;
  const paymentStatus = paymentDetails.payload.payment.entity.status;
  const paymentAmount = paymentDetails.payload.payment.entity.amount;

  // Find the order by orderId
  const order = await Order.findOne({ orderId });

  if (!order) {
    return res.status(400).json({ message: 'Order not found' });
  }

  // Update the order status to 'Paid'
  order.status = paymentStatus === 'captured' ? 'Paid' : 'Failed';
  order.amountPaid = paymentAmount / 100; // Convert amount to original currency unit
  await order.save();
  sendPaymentSuccessNotification(order);

  return res.status(200).json({ message: 'Payment processed successfully' });
};


//get order status
const getOrderStatus = async (req, res) => {
  
  const { order_id } = req.params; // Get the order ID from URL parameters

  try {
    // Fetch order details from Razorpay API using the order ID
    const order = await razorpayInstance.orders.fetch(order_id);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order status",
      error: error.message,
    });
  }
};



// Function to verify payment
const verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  try {
    // Find the order in the database using Razorpay's orderId
    const order = await Order.findOne({ razorpayOrderId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Razorpay payment verification logic using Razorpay SDK
    const razorpay = new Razorpay({ 
      key_id: 'rzp_test_Qy2enDn8znal1s', 
      key_secret: 'me9oMECjechexBWt3Ju6WeJd' 
    });

    // Verify the signature with Razorpay SDK
    const isValid = razorpay.utility.verifyPaymentSignature({
      order_id: razorpayOrderId,
      payment_id: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (isValid) {
      // Update order status and payment status
      order.paymentStatus = 'paid';
      order.payment = true;  // Mark as paid
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = razorpaySignature;
      order.receipt = `receipt_${Date.now()}`;
      await order.save();

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Error while verifying payment:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment." });
  }
};

//Tracking order
const TrackingOrder = async (req, res) => {
  const { orderId } = req.params;  // Get orderId from URL parameters

  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required." });
  }

  try {
    // Fetch the order from MongoDB using the orderId stored as `order_id`
    const order = await Order.findOne({ order_id: orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Check if the order is paid or not
    if (order.paymentStatus === 'paid') {
      return res.status(200).json({ message: "Order verified", order });
    } else {
      return res.status(400).json({ error: "Order payment not completed" });
    }
  } catch (error) {
    console.error("Error while verifying order:", error);
    return res.status(500).json({ error: "Failed to verify order." });
  }
};

module.exports = { createOrder, updateOrderStatus,userOrder, paymentSucess, TrackingOrder, verifyPayment, getOrderStatus};











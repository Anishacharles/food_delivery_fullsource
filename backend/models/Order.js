
// const mongoose = require('mongoose');
// const orderSchema = new mongoose.Schema({
//     userId:
//     {
//        type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     items: [{
//         productsId: { type: String, required: true }, // ID of the product
//         quantity: { type: Number, required: true } // Quantity of the item ordered
//     }],
//     amount:
//     {
//         type: Number,
//         required: true
//     },
//     address:
//     {
//         street: { type: String, required: true },
//         city: { type: String, required: true },
//         zip: { type: String, required: true }
//     },
//     status: {
//         type: String,
//         enum: [
//             "Food Processing",
//             "Ready for Delivery",
//             "Out for Delivery",
//             "Delivered",
//             "Cancelled",
//             "Refund Initiated",
//             "Refunded"
//         ],
//         default: "Food Processing"
//     },
//     date:
//     {
//         type: Date,
//         default: Date.now
//     },
//     payment:
//     {
//         type: Boolean,
//         default: false
//     }
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;



const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  
  },
  items: [{
    productId: { type: String, required: true },  
    quantity: { type: Number, required: true },
  }],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
  },
  status: {
    type: String,
    enum: [
      "Food Processing",
      "Ready for Delivery",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Refund Initiated",
      "Refunded",
    ],
    default: "Food Processing",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "failed"],
    default: "pending",  
  },
  razorpayOrderId: {
    type: String,  
  },
  razorpayPaymentId: {
    type: String,  
  },
  razorpaySignature: {
    type: String,  
  },
  receipt: {
    type: String,  
  },
  date: {
    type: Date,
    default: Date.now,
  },
  payment: {
    type: Boolean,
    default: false,  
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

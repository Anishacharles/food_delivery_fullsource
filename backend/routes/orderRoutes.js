const express = require('express');
const {  createOrder, updateOrderStatus, userOrder, verifyPayment,  
    TrackingOrder, paymentSucess, getOrderStatus } = require('../controllers/orderController'); 

const verifyUserToken = require('../middlewares/verifyUserToken');

const router = express.Router();



// Route to create a new order
router.post('/create-order', createOrder);

router.post('/update-status',updateOrderStatus)
router.post('/payment-success', paymentSucess);

router.get('/status/:orderId', getOrderStatus);

router.get('/userorders', userOrder)
// Verify an order
router.post('/verify-payment', verifyPayment);


// Route to get order details (for tracking)
router.get("/razorpay-keypayment/:orderId",TrackingOrder);




module.exports = router;

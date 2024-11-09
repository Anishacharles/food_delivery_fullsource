const express = require('express');
const { addToCart, getCart, updateCartItem, removeFromCart} = require('../controllers/cartController');
const verifyUserToken = require('../middlewares/verifyUserToken');


const router = express.Router();

// Add item to cart
router.post('/add', verifyUserToken, addToCart);

// Add item to cart
router.post('/remove', verifyUserToken, removeFromCart);

// Get user's cart
router.get('/',verifyUserToken,getCart);

// Update item quantity in cart
router.put('/update/:itemId', verifyUserToken,updateCartItem);


module.exports = router;

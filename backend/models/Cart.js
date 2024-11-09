const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        productsId: { type: String, required: true }, // ID of the product
        quantity: { type: Number, required: true } // Quantity of the product ordered
    }]
});

module.exports = mongoose.model('Cart', cartSchema);

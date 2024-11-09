const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["user", "admin", "vendor"], 
        default: "user" 
    },
   
    favorites: {
        firmId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Firm' }],
        default: []      
    },
    reviews: [
        { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Review' 
        }
        ],
        
    notifications: {
        promotions: { type: Boolean, default: true },
        status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        newRestaurants: { type: Boolean, default: true },
    },
    cartData: {
        type: [{
            productsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
            price: { type: Number },
        }],
        default: []
    }
}, { minimize: false });



const User = mongoose.model('User', userSchema);
module.exports = User;

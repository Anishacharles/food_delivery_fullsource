// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    firmId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }],
});

module.exports = mongoose.model('Favorite', favoriteSchema);

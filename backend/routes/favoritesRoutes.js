const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoritesController'); 
const verifyUserToken = require('../middlewares/verifyUserToken');

const router = express.Router();

// Add a firm to favorites
router.post('/add/:userId', verifyUserToken, addFavorite);

// Remove a firm from favorites
router.post('/remove', verifyUserToken, removeFavorite);

// Get all favorites for the authenticated user
router.get('/:userId', verifyUserToken, getFavorites);

module.exports = router;

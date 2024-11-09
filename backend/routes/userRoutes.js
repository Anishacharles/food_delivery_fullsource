const express = require('express');
const { register, login, search, getProfile, getProfileById, updateProfile } = require('../controllers/userController');
const verifyUserToken = require('../middlewares/verifyUserToken'); 
const router = express.Router();

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Search Route
router.get('/search', verifyUserToken, search);

// Get User Profile Route
router.get('/profile', verifyUserToken, getProfile);

// Get User Profile by ID Route
router.get('/profile/:id', verifyUserToken, getProfileById);

router.put('/update-profile', verifyUserToken, updateProfile);

module.exports = router;

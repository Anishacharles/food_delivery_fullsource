// const express = require('express');
// const firmController = require('../controllers/firmController');
// const verifyToken = require('../middlewares/verifyToken');


// const router = express.Router()

// router.post('/add-firm', verifyToken, firmController.addFirm);

// router.get('/uploads/:imageName', (req, res) => {
//     const imageName = req.params.imageName;
//     res.header('Content-Type', 'image/jpeg');
//     res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
// });

// router.delete('/:firmId', firmController.deleteFirmById);


// module.exports = router;

const express = require('express');
const path = require('path');  // Added path module
const {addFirm, deleteFirmById, submitRating,getRatings} = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const verifyUserToken = require('../middlewares/verifyUserToken')

const router = express.Router();

// POST route to add a firm with token verification
router.post('/add-firm', verifyToken, addFirm);

// GET route to serve image files from the uploads directory
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

// DELETE route to delete a firm by its ID
router.delete('/:firmId', deleteFirmById);

// Route to submit a rating for a restaurant
router.post("/rate", verifyUserToken, submitRating);

// Route to get all ratings for a restaurant
router.get("/ratings/:firmId", getRatings);

module.exports = router;

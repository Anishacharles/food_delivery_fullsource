const User = require('../models/User'); 
const Firm = require('../models/Firm'); 



exports.addFavorite = async (req, res) => {
    const { firmId } = req.body;

    try {
        const user = await User.findById(req.userId); // Retrieve the full user document
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.favorites.firmId.includes(firmId)) {
            user.favorites.firmId.push(firmId);
            await user.save();
            res.status(200).json({ message: "Favorite added!" });
        } else {
            res.status(400).json({ message: "Firm already in favorites." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Remove a firm from favorites
exports.removeFavorite = async (req, res) => {
    const { firmId } = req.body; // Extract firmId from the request body

    try {
        const user = await User.findById(req.userId); // Get the user by userId from the token

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the firmId exists in favorites
        const index = user.favorites.firmId.indexOf(firmId);
        if (index !== -1) {
            user.favorites.firmId.splice(index, 1); // Remove the firmId from the array
            await user.save(); // Save the updated user document
            res.status(200).json({ message: "Favorite removed!" });
        } else {
            res.status(400).json({ message: "Firm not found in favorites." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get user favorites
exports.getFavorites = async (req, res) => {
    try {
        // Assuming req.userId contains the authenticated user's ID
        const user = await User.findById(req.params.userId).populate('favorites.firmId');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user's favorites, populated with full firm data
        res.status(200).json(user.favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

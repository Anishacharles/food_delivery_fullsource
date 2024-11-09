

const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

// Setup multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Add a new firm
const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Ensure a vendor can only have one firm
        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "Vendor can have only one firm" });
        }

        // Create new firm
        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();
        const firmId = savedFirm._id
        const vendorFirmName = savedFirm.firmName

        vendor.firm.push(savedFirm);
        await vendor.save();

        return res.status(200).json({ message: 'Firm added successfully', firmId: savedFirm._id, vendorFirmName: savedFirm.firmName });

    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
};

// Delete firm by ID
const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if (!deletedFirm) {
            return res.status(404).json({ message: "Firm not found" });
        }

        return res.status(200).json({ message: "Firm deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// Controller to handle rating submission
const submitRating = async (req, res) => {
  const { firmId, rating, review } = req.body;
  const userId = req.userId;

  try {
    // Find the restaurant by ID
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Add the rating to the restaurant's ratings array
    const newRating = { user: userId, rating, review };
    firm.ratings.push(newRating);

    // Save the restaurant with the new rating
    await firm.save();

    res.status(201).json({ message: "Rating submitted successfully", firm});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit rating" });
  }
};

// Controller to get all ratings for a specific restaurant
const getRatings = async (req, res) => {
    const { firmId } = req.params;
  
    try {
      // Find the restaurant by ID and populate the ratings field 
      const firm = await Firm.findById(firmId).populate("ratings.user", "username email");
  
      if (!firm) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
  
      // Send the ratings
      res.status(200).json({ ratings: restaurant.ratings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch ratings" });
    }
  };
  


module.exports = { 
    addFirm: [upload.single('image'), addFirm], 
    deleteFirmById,
    submitRating,
    getRatings
};

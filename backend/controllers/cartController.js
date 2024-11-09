const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Assuming you have a Product mode
const User = require('../models/User')

const addToCart = async (req, res) => {
    const { productsId, quantity } = req.body;
    const userId = req.userId; // Assuming you have user ID set from token verification

    if (!productsId || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required." });
    }

    try {
        // Check if the cart exists for the user
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Find index of the item in the cart
            const itemIndex = cart.items.findIndex(item => item.productsId.toString() === productsId);

            if (itemIndex > -1) {
                // Update quantity if the product exists in the cart
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new product if it doesn't exist in the cart
                cart.items.push({ productsId, quantity });
            }
            await cart.save();
        } else {
            // Create a new cart if the user doesn't have one
            cart = await Cart.create({ userId, items: [{ productsId, quantity }] });
        }

        // Now, update the user's cartData to keep it in sync
        const user = await User.findById(userId);
        const userItemIndex = user.cartData.findIndex(item => item.productsId.toString() === productsId);

        if (userItemIndex > -1) {
            // Update quantity if the product exists in user's cartData
            user.cartData[userItemIndex].quantity += quantity;
        } else {
            // Add new product if it doesn't exist in user's cartData
            user.cartData.push({ productsId, quantity });
        }
        
        await user.save(); // Save the updated user document

        res.status(201).json({ message: "Product added to cart.", cart });
    } catch (error) {
        console.error("Error adding to cart:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Return the specific error message
    }
};

// Remove product from cart
// const removeFromCart = async (req, res) => {
//     const { productsId } = req.body;
//     const userId = req.userId;

//     if (!productsId) {
//         return res.status(400).json({ error: "Product ID is required." });
//     }

//     try {
//         const cart = await Cart.findOne({ userId });
//         if (!cart) {
//             return res.status(404).json({ error: "Cart not found." });
//         }

//         cart.items = cart.items.filter(item => item.productsId !== productsId);
//         await cart.save();

//         res.status(200).json({ message: "Product removed from cart." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to remove product from cart." });
//     }
// };
const removeFromCart = async (req, res) => {
    const { productsId } = req.body; // Get the product ID to be removed
    const userId = req.userId; // Assuming you have user ID set from token verification

    if (!productsId) {
        return res.status(400).json({ error: "Product ID is required." });
    }

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ userId });

        if (cart) {
            // Find index of the item in the cart
            const itemIndex = cart.items.findIndex(item => item.productsId.toString() === productsId);

            if (itemIndex > -1) {
                // Remove the item from the cart
                cart.items.splice(itemIndex, 1);
                await cart.save(); // Save the updated cart
                console.log(`Product ${productsId} removed from cart.`);
            } else {
                return res.status(404).json({ error: "Product not found in cart." });
            }
        } else {
            return res.status(404).json({ error: "Cart not found." });
        }

        // Now, also update the user's cartData
        const user = await User.findById(userId);
        const userItemIndex = user.cartData.findIndex(item => item.productsId.toString() === productsId);

        if (userItemIndex > -1) {
            // Remove the item from the user's cartData
            user.cartData.splice(userItemIndex, 1);
            await user.save(); // Save the updated user document
            console.log(`Product ${productsId} removed from user's cartData.`);
        }

        res.status(200).json({ message: "Product removed from cart." });
    } catch (error) {
        console.error("Error removing from cart:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Return the specific error message
    }
};


// Update product quantity in cart
const updateCartItem = async (req, res) => {
    const { productsId, quantity } = req.body;
    const userId = req.userId;

    if (!productsId || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required." });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        const itemIndex = cart.items.findIndex(item => item.productsId === productsId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ message: "Cart item updated." });
        } else {
            res.status(404).json({ error: "Product not found in cart." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update cart item." });
    }
};

// Get all products in the cart
const getCart = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productsId');
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve cart." });
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    updateCartItem,
    getCart
};

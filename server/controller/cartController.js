import User from "../models/userModel.js";

const getAllCart = async (req, res) => {
    try {
        const user = req.body.user;
        const data = user.cart;
        res.status(200).json({
            status: "Success",
            message: "All items",
            results: user.cart.length,
            data: {
                data,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};
const createCart = async (req, res) => {
    try {
        const user = req.body.user;
        const { productId, quantity } = req.body; 
        // console.log(req.body);

        if (!productId || !quantity) {
            return res.status(400).json({
                status: "Fail",
                message: "Product and quantity are required",
            });
        }

        // Check if the product is already in the cart
        // console.log( user.cart[0]._id.toString());
        const existingCartItem = user.cart?.find((item) => {
            const id = item.productId?.toString();
            // console.log(id, " ", productId);
            // console.log(id === productId);
            return id === productId;
        });

        // console.log("kya huya", existingCartItem);
        if (existingCartItem) {
            // Update the quantity if the product already exists in the cart
            existingCartItem.quantity += quantity;
        } else {
            // Add the new cart item to the cart array
            user.cart.push({ productId, quantity });
            // console.log(user.cart);
        }

        // Save the user with the updated cart
        await user.save();

        res.status(200).json({
            status: "Success",
            user: user,
            results: {
                cartItems: user.cart, // Return the updated cart items
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

const removeCart = async (req, res) => {
    try {
        const user = req.body.user; // User should be passed from the verify token middleware
        const { productId, quantity } = req.body; // Extract productId and quantity from the request body
        console.log(productId, quantity);
        // Validate the productId and quantity
        if (!productId || quantity == null) {
            return res.status(400).json({
                status: "Fail",
                message: "ProductId and quantity are required",
            });
        }

        // Find the productId in the cart
        const cartItemIndex = user.cart.findIndex(
            (item) => item.productId.toString() === productId
        );

        // If the productId is not in the cart, return an error
        if (cartItemIndex === -1) {
            return res.status(404).json({
                status: "Fail",
                message: "ProductId not found in cart",
            });
        }

        // Update the quantity or remove the item if quantity becomes 0 or less
        const existingCartItem = user.cart[cartItemIndex];
        existingCartItem.quantity -= quantity;

        if (existingCartItem.quantity <= 0) {
            user.cart.splice(cartItemIndex, 1); // Remove the item if quantity is 0 or less
        }

        // Save the user with the updated cart
        await user.save();

        res.status(200).json({
            status: "Success",
            results: {
                cartItems: user.cart, // Return the updated cart items
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

export default { getAllCart, createCart, removeCart };

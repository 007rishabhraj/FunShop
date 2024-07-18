import User from "../models/userModel.js";


const getAllCart = async (req,res)=>{
    try{
        const user = req.body.user;
        const data = user.cart;
        res.status(200).json({
            status:"Success",
            message:"All items",
            results:user.cart.length,
            data:{
                data
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error")
        
    }

}
const createCart = async (req, res) => {
  try {
    const user = req.body.user; // User should be passed from the verify token middleware
    const { product, quantity } = req.body; // Extract product and quantity from the request body
    // console.log("cart ki ma ki chut")
    // console.log(req.body);
    // Validate the product and quantity
    if (!product || !quantity) {
      return res.status(400).json({
        status: "Fail",
        message: "Product and quantity are required",
      });
    }

    // Check if the product is already in the cart
    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === product
    );

    if (existingCartItem) {
      // Update the quantity if the product already exists in the cart
      existingCartItem.quantity += quantity;
    } else {
      // Add the new cart item to the cart array
      user.cart.push({ product, quantity });
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

const removeCart = async (req, res) => {
  try {
    const user = req.body.user; // User should be passed from the verify token middleware
    const { product, quantity } = req.body; // Extract product and quantity from the request body

    // Validate the product and quantity
    if (!product || quantity == null) {
      return res.status(400).json({
        status: "Fail",
        message: "Product and quantity are required",
      });
    }

    // Find the product in the cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === product
    );

    // If the product is not in the cart, return an error
    if (cartItemIndex === -1) {
      return res.status(404).json({
        status: "Fail",
        message: "Product not found in cart",
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


export default {getAllCart,createCart,removeCart}
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
    console.log("cart ki ma ki chut")
    console.log(req.body);
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

const removeFromCart = async (req, res) => {

};

export default {getAllCart,createCart,removeFromCart}
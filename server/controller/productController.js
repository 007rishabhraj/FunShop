import Product from "../models/productModel.js"; // Import your Product model
import APIFeatures from "../utils/apiFeatures.js"; // Import your APIFeatures class

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Create a new Product instance from request body
    await newProduct.save(); // Save the new product to the database
    res.status(201).json(newProduct); // Respond with the created product
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

// Function to get all products with advanced features
const getAllProduct = async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();

    const products = await features.query; // Execute the query
    res.json(products); // Send the products as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

// Function to get a single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product); // Send the product as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

// Function to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await product.remove(); // Remove the product from the database
    res.json({ msg: "Product removed" }); // Send a success message
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

// Function to update a product by ID  /
const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let product = await Product.findById(req.params.id); // Find product by ID
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    
    // Update product fields if provided in request body
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    await product.save(); // Save the updated product to the database
    res.json(product); // Send the updated product as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

export default {
  createProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};

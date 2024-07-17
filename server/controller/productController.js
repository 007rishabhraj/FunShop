import Product from "../models/productModel.js"; 
import APIFeatures from "../utils/apiFeatures.js"; 

const createProduct = async (req, res) => {
 try{
    //  implement algolia 
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status:"success",
      data:{
        newProduct
      }
    })
 }catch(err){
      console.error(err.message);
      res.status(500).send("Server Error");
 }
};


const getAllProduct = async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();

    const products = await features.query; // Execute the query
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
};


const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); 
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
   res.status(200).json({
    status:"success",
    data:{
      product
    }
   })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); 
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status:'Success',
      data:null
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators: true
    }); 
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price; 
    res.status(200).json({
      status:'success',
      data:{
        product
      }
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
};

export default {
  createProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};

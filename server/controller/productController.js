import APIFeatures from "../utils/ApiFeatures";
const features = new APIFeatures(Tour.find(), req.query)
  .filter()
  .sort()
  .limitField()
  .paginate();
const data = await features.query;

const createProduct = async (req, res) => {
    
};
const getAllProduct = (res,req)=>{}
const getProduct = async (req, res) => {};
const deleteProduct = async (req, res) => {};
const updateProduct = async (req, res) => {};

export default {createProduct,getAllProduct,getProduct,deleteProduct,updateProduct}
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
   {
    name: {
      type: String,
      // required: [true, 'A product must have a name'],
      // unique: true,
      trim: true,
      maxlength: [400, 'A product name must have less or equal then 40 characters'],
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      // type: [{
      //   rating : Number,
      //   message: String
      // }],
      // default: []

      type: Number

    },
    price: {
      type: Number,
      // required: [true, 'A Product must have a price']
    },
    description: {
      type: String,
      trim: true
    },
    images:{
      type: [String]
    }
  }
)

const Product = mongoose.model("Product", productSchema);
export default Product;
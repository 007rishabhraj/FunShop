import express from "express";
import productController from "../controller/productController.js";
import verifyUser from "../middleware/verifyUser.js";

export const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getAllProduct)
  .post(verifyUser, productController.createProduct);
productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(verifyUser, productController.updateProduct)
  .delete(verifyUser, productController.deleteProduct);

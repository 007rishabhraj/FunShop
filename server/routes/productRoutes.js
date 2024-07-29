import express from "express";
import productController from "../controller/productController.js";
import verifyUser from "../middleware/verifyUser.js";
import checkCache from "../middleware/checkCache.js";

export const productRouter = express.Router();

productRouter
  .route("/")
  .get(checkCache,productController.getAllProduct)
  .post(verifyUser, productController.createProduct);
productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(verifyUser, productController.updateProduct)
  .delete(verifyUser, productController.deleteProduct);

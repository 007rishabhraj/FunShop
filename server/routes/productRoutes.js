import express from "express";
import productController from "../controller/productController";
import verifyUser from "../middleware/verifyUser";

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProduct)
  .post(verifyUser, productController.createProduct);
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(verifyUser, productController.updateProduct)
  .delete(verifyUser, productController.deleteProduct);

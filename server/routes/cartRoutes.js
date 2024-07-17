import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import cartController from "../controller/cartController.js";

export const cartRouter = express.Router();

cartRouter
  .route("/")
  .all(verifyUser)
  .get(cartController.getAllCart)
  .post(cartController.createCart)
  .delete(cartController.removeFromCart);

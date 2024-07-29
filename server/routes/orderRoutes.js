import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import orderController from "../controller/orderController.js";

export const orderRouter = express.Router();

orderRouter
  .route("/")
  .all(verifyUser)
  .post(orderController.createOrder)
  .get(orderController.getUserOrders)
  .delete(orderController.cancelOrder);

orderRouter.route("/:orderId").get(verifyUser, orderController.getOrder);

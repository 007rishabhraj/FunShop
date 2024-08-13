import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  createReview,
  getAllReviews,
  getReviews,
} from "../controller/reviewController.js";

export const reviewRouter = express.Router();

reviewRouter.route("/").all(verifyUser).post(createReview);
reviewRouter.use(verifyUser).get("/all", getAllReviews);
reviewRouter.route("/:productId").get(verifyUser, getReviews);



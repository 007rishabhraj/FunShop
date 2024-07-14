import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import userController from "../controller/userController.js";
export const userRouter = express.Router();

userRouter
  .route("/")
  // .all(verifyUser)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

  userRouter.route("/login").post(userController.login);
  userRouter.route("/signup").post(userController.signup);
  userRouter.route('/users').get(userController.getAllUsers)

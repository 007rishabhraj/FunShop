import express from "express";
import verifyUser from "../middleware/verifyUser";
import userController from "../controller/userController";
const router = express.Router();

router
  .route("/")
  .all(verifyUser)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/login").post(userController.login);
router.route("/signup").post(userController.signup);

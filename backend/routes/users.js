import express from "express";
import * as userController from "../controllers/users.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/confirm/:token", userController.checkAccountVerificationToken);
router.post("/reset-password", userController.resetPassword);
router.get(
  "/reset-password/:token",
  userController.checkNewAccountVerificationToken
);
router.post("/reset-password/:token", userController.createNewPassword);

router.get("/profile", checkAuth, userController.getProfile);

export default router;

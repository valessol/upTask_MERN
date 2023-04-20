import express from "express";
import * as userController from "../controllers/users.js";

const router = express.Router();

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/confirm/:token", userController.emailConfirmation);
router.post("/reset-password", userController.resetPassword);
router.post("/reset-password/:token", userController.checkToken);

export default router;

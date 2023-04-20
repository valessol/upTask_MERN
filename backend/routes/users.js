import express from "express";
import * as userController from "../controllers/users.js";

const router = express.Router();

router.post("/", userController.register);

export default router;

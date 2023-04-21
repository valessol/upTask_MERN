import express from "express";
import * as tasksController from "../controllers/tasks.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, tasksController.addTask);
router
  .route("/:id")
  .get(checkAuth, tasksController.getTask)
  .put(checkAuth, tasksController.editTask)
  .delete(checkAuth, tasksController.deleteTask);
router.post("/state/:id", checkAuth, tasksController.changeTaskState);

export default router;

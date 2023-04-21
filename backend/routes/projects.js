import express from "express";
import * as projectsController from "../controllers/projects.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, projectsController.getProjects)
  .post(checkAuth, projectsController.createNewProject);
router
  .route("/:id")
  .get(checkAuth, projectsController.getProject)
  .put(checkAuth, projectsController.editProject)
  .delete(checkAuth, projectsController.deleteProject);
router.post("/add-collaborator", checkAuth, projectsController.addCollaborator);
router.post(
  "/delete-collaborator",
  checkAuth,
  projectsController.deleteCollaborator
);

export default router;

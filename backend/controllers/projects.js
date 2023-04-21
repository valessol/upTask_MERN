import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find().where("creator").equals(req.user);
  res.json(projects);
};

export const createNewProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  const isOwner = project.creator.toString() === req.user._id.toString();

  if (!isOwner) {
    const error = new Error("No autorizado");
    return res.status(401).json({ msg: error.message });
  }

  res.json(project);
};

export const editProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  const isOwner = project.creator.toString() === req.user._id.toString();

  if (!isOwner) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
  }

  Object.entries(req.body).forEach(([key, value]) => {
    project[key] = value;
  });

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  const isOwner = project.creator.toString() === req.user._id.toString();

  if (!isOwner) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await project.deleteOne();
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export const addCollaborator = async (req, res) => {};

export const deleteCollaborator = async (req, res) => {};

export const getTasks = async (req, res) => {};

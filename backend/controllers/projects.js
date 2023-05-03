import Project from "../models/Project.js";
import User from "../models/User.js";

const getCheckedProject = async (projectId, userId) => {
  const project = await Project.findById(projectId).populate("tasks");

  if (!project) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  const isOwner = project.creator.toString() === userId.toString();

  if (!isOwner) {
    const error = new Error("No autorizado");
    return res.status(401).json({ msg: error.message });
  }

  return project;
};

export const getProjects = async (req, res) => {
  const projects = await Project.find()
    .where("creator")
    .equals(req.user)
    .select("-tasks");
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
  const project = await getCheckedProject(id, req.user._id);
  //const tasks = await Task.find().where("project").equals(project._id);

  //res.json({ project, tasks });
  res.json(project);
};

export const editProject = async (req, res) => {
  const { id } = req.params;
  const project = await getCheckedProject(id, req.user._id);

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
  const project = await getCheckedProject(id, req.user._id);

  try {
    await project.deleteOne();
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export const searchCollaborator = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    "-confirm -createdAt -password -token -updatedAt -__v"
  );

  if (!user) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(user);
};

export const addCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar que sólo el creador del proyecto puede añadir colaboradores
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    "-confirm -createdAt -password -token -updatedAt -__v"
  );

  if (!user) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar que el colaborador no es el admin del proyecto
  if (project.creator.toString() !== user._id.toString()) {
    const error = new Error("El creador del proyecto no puede ser colaborador");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar que no haya sido previamente añadido al proyecto
  if (project.collaborators.includes(user._id)) {
    const error = new Error("El usuario ya ha sido añadido al proyecto");
    return res.status(404).json({ msg: error.message });
  }

  project.collaborators.push(user._id);
  await project.save();
  res.json({ msg: "Colaborador agragado correctamente" });
};

export const deleteCollaborator = async (req, res) => {};

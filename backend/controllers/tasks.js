import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getCheckedTask = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate("project");

  if (!task) {
    const error = new Error("La tarea no existe");
    return res.status(404).json({ msg: error.message });
  }

  const isOwner = task.project.creator.toString() === userId.toString();

  if (!isOwner) {
    const error = new Error("No autorizado");
    return res.status(403).json({ msg: error.message });
  }

  return task;
};

export const addTask = async (req, res) => {
  const { project } = req.body;

  const existProject = await Project.findById(project);

  if (!existProject) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  const isOwner = existProject.creator.toString() === req.user._id.toString();

  if (!isOwner) {
    const error = new Error("No autorizado");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const createdTask = await Task.create(req.body);
    // Almacenar el Id de tarea en el proyecto
    existProject.tasks.push(createdTask._id);
    await existProject.save();
    res.json(createdTask);
  } catch (error) {
    console.log(error);
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await getCheckedTask(id, req.user._id);

  res.json(task);
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const task = await getCheckedTask(id, req.user._id);

  Object.entries(req.body).forEach(([key, value]) => {
    if (key === "project") return;
    task[key] = value;
  });

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await getCheckedTask(id, req.user._id);

  try {
    const project = await Project.findById(task.project);
    project.task.pull(task._id);

    await Promise.allSettled([await project.save(), await task.deleteOne()]);
    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export const changeTaskState = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id)
    .populate("project")
    .populate("completed");

  if (!task) {
    const error = new Error("La tarea no existe");
    return res.status(404).json({ msg: error.message });
  }

  const isOwner = task.project.toString() === req.user._id.toString();
  const isCollaborator = task.project.collaborators.some(
    (col) => col._id === req.user._id
  );

  if (!isOwner && !isCollaborator) {
    const error = new Error("No autorizado");
    return res.status(401).json({ msg: error.message });
  }

  task.state = !task.state;
  task.completed = req.user._id;
  await task.save();
  const savedTask = await Task.findById(id)
    .populate("project")
    .populate("completed");
  res.json(savedTask);
};

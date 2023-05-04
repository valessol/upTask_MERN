import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

let socket;
export const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [done, setDone] = useState(false);
  const [modal, setModal] = useState({});
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projects) {
      if (done) getProjects();
      else setProjects([]);
    } else if (!projects.length) {
      if (done) return;
      else getProjects();
    }
  }, [projects, done]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const getProjects = async () => {
    console.log("getProjects");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      console.log("has token");
      const { data } = await axiosClient("/projects", config);
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
    console.log("finish");
    setLoading(false);
  };

  const submitProject = async (project) => {
    setLoading(true);
    if (project._id) {
      await editProject(project);
    } else {
      await createNewProject(project);
    }
    setLoading(false);
  };

  const createNewProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post("/projects", project, config);
      setProjects([...projects, data]);
      setAlert({
        msg: `Proyecto ${data.name} creado con éxito`,
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(
        `/projects/${project._id}`,
        project,
        config
      );

      // Sincronizar el State
      const updatedProjects = projects.filter(
        (item) => item._id !== project._id
      );
      setProjects([...updatedProjects, data]);
      setAlert({
        msg: `Proyecto ${data.name} actualizado con éxito`,
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      navigate("/projects");
      setAlert({
        msg: error.response.data.msg,
        type: "error",
      });
      setTimeout(() => setAlert({}), 3000);
    }
    setLoading(false);
  };

  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/projects/${id}`, config);
      const updatedProjects = projects.filter((proj) => proj._id !== id);
      setProjects(updatedProjects);
      setAlert({
        msg: data.msg,
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmitModal = async (task) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      if (!task._id) {
        const { data } = await axiosClient.post(`/tasks`, task, config);
        setAlert({});

        // Socket.io
        socket.emit("add-task", data);
      } else {
        const { data } = await axiosClient.put(
          `/tasks/${task._id}`,
          task,
          config
        );
        socket.emit("update-task", data);
        setAlert({});
      }
    } catch (error) {
      console.log(error);
    }
    setModal({ ...modal, open: false });
    setLoading(false);
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(`/tasks/${id}`, config);
      setAlert({
        msg: data.msg,
        type: "success",
      });

      socket.emit("delete-task", id);

      setTimeout(() => setAlert({}), 3000);
    } catch (error) {
      console.log(error);
    }
    setModal({ ...modal, open: false });
    setLoading(false);
  };

  const searchCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/projects/collaborators`,
        { email },
        config
      );
      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
    setLoading(false);
  };

  const addCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );
      setCollaborator(data);
      setAlert({ msg: data.msg, type: "success" });
      setCollaborator({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
    setLoading(false);
  };

  const deleteCollaborator = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/projects/delete-collaborator/${project._id}`,
        { id },
        config
      );
      setAlert({ msg: data.msg, type: "success" });
      setCollaborator({});
      const updatedProject = {
        ...project,
        collaborators: [
          ...project.collaborators.filter((col) => col._id !== id),
        ],
      };
      setProject(updatedProject);
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
    setLoading(false);
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, config);

      socket.emit("change-state", data);
      setAlert({});
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
  };

  // Socket.io
  const submitProjectTasks = (task) => {
    const updatedProject = { ...project, tasks: [...project.tasks, task] };
    setProject(updatedProject);
  };

  const deleteProjectTask = (id) => {
    const updatedProject = projects.find((project) =>
      project.task.some((task) => task._id === id)
    );
    const newUpdatedProject = {
      ...updatedProject,
      tasks: [...updatedProject.tasks.filter((task) => task._id !== id)],
    };
    setProject(newUpdatedProject);
  };

  const editProjectTask = (task) => {
    const updatedProject = {
      ...project,
      tasks: project.tasks.map((taskState) =>
        taskState._id === task._id ? task : taskState
      ),
    };
    setProject(updatedProject);
  };

  const changeTaskState = (task) => {
    const updatedProject = {
      ...project,
      tasks: [
        ...project.tasks.map((task) => (task._id === task._id ? task : task)),
      ],
    };
    setProject(updatedProject);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        project,
        setProjects,
        submitProject,
        getProject,
        loading,
        deleteProject,
        alert,
        setAlert,
        setDone,
        modal,
        setModal,
        handleSubmitModal,
        deleteTask,
        collaborator,
        searchCollaborator,
        addCollaborator,
        deleteCollaborator,
        completeTask,
        submitProjectTasks,
        deleteProjectTask,
        editProjectTask,
        changeTaskState,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export default ProjectsProvider;

import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";

export const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
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

      const { data } = await axiosClient("/projects", config);
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
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
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export default ProjectsProvider;

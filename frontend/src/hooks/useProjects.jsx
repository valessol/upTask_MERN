import { useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";

const useProjects = () => {
  return useContext(ProjectsContext);
};
export default useProjects;

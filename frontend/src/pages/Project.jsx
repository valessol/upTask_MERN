import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import useProjects from "../hooks/useProjects";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Task from "../components/Task";
import Alert from "../components/Alert";
import Collaborator from "../components/Collaborator";
import useAdmin from "../hooks/useAdmin";

let socket;

const Project = () => {
  const { id } = useParams();
  const {
    getProject,
    project,
    loading,
    alert,
    setModal,
    submitProjectTasks,
    deleteProjectTask,
    editProjectTask,
    changeTaskState,
  } = useProjects();
  const isAdmin = useAdmin();
  const { name } = project;

  useEffect(() => {
    getProject(id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("open-project", id);
  }, []);

  useEffect(() => {
    socket.on("task-added", (task) => {
      if (task.project === project._id) submitProjectTasks(task);
    });

    socket.on("task-deleted", (taskId) => {
      deleteProjectTask(taskId);
    });

    socket.on("task-updated", (task) => {
      if (task.project._id === project._id) editProjectTask(task);
    });

    socket.on("state-changed", (task) => {
      if (task.project._id === project._id) changeTaskState(task);
    });
  });

  const handleClick = () => {
    setModal({
      title: "Crear tarea",
      data: {},
      open: true,
    });
  };

  return (
    <>
      {loading ? (
        <Spinner text="Cargando..." />
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="font-black text-4xl">{name}</h1>
            {isAdmin && (
              <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                <Link
                  to={`/proyectos/editar/${id}`}
                  className="uppercase font-bold"
                >
                  Editar
                </Link>
              </div>
            )}
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={handleClick}
              className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
              Nueva tarea
            </button>
          )}

          <p className="font-bold text-xl mt-10">Tareas del proyecto</p>
          {alert.msg && (
            <div className="flex justify-center">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <Alert alert={alert} />
              </div>
            </div>
          )}
          <div className="bg-white shadow mt-10 rounded-lg">
            {project?.tasks?.length ? (
              project.tasks.map((task) => <Task key={task._id} task={task} />)
            ) : (
              <p className="text-center my-5 p-10">
                No hay tareas en este proyecto
              </p>
            )}
          </div>

          {isAdmin && (
            <>
              <div className="flex justify-between mt-10 items-center">
                <p className="font-bold text-xl mt-10">Colaboradores</p>

                <Link
                  to={`/proyectos/nuevo-colaborador/${id}`}
                  className="uppercase font-bold text-gray-400 hover:text-black"
                >
                  Editar
                </Link>
              </div>

              <div className="bg-white shadow mt-10 rounded-lg">
                {project?.collaborators?.length ? (
                  project.collaborators.map((col) => (
                    <Collaborator key={col._id} collaborator={col} />
                  ))
                ) : (
                  <p className="text-center my-5 p-10">
                    No hay colaboradores en este proyecto
                  </p>
                )}
              </div>
            </>
          )}

          <Modal />
        </>
      )}
    </>
  );
};
export default Project;

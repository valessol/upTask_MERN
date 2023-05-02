import { useState } from "react";
import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";
import Modal from "./Modal";
import DialogModal from "./DialogModal";

const Task = ({ task }) => {
  const [dialogModal, setDialogModal] = useState(false);
  const { setModal, deleteTask } = useProjects();
  const { description, name, priority, finishDate, state, _id } = task;

  const handleEditClick = () => {
    setModal({
      title: "Editar tarea",
      data: task,
      open: true,
    });
  };

  const handleDeleteTask = () => {
    deleteTask(task._id);
    setDialogModal(false);
  };

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{formatDate(finishDate)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {priority}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={handleEditClick}
        >
          Editar
        </button>

        {state ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}

        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => setDialogModal(true)}
        >
          Eliminar
        </button>
      </div>

      <Modal />
      <DialogModal
        open={dialogModal}
        onClose={() => setDialogModal(false)}
        onSubmit={handleDeleteTask}
      />
    </div>
  );
};
export default Task;

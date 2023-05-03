import { useState } from "react";
import useProjects from "../hooks/useProjects";
import DialogModal from "./DialogModal";

const Collaborator = ({ collaborator }) => {
  const [dialogModal, setDialogModal] = useState(false);
  const { deleteCollaborator } = useProjects();
  const { name, email, _id } = collaborator;

  const handleDelete = () => {
    deleteCollaborator(_id);
    setDialogModal(false);
  };

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{email}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => setDialogModal(true)}
        >
          Eliminar
        </button>
      </div>

      <DialogModal
        open={dialogModal}
        onClose={() => setDialogModal(false)}
        onSubmit={handleDelete}
        content={{
          title: "Eliminar colaborador",
          text: "Una vez eliminado, este colaborador no podrá acceder al proyecto",
        }}
      />
    </div>
  );
};
export default Collaborator;

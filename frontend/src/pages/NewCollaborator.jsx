import { useParams } from "react-router-dom";
import CollaboratorForm from "../components/CollaboratorForm";
import { useEffect } from "react";
import useProjects from "../hooks/useProjects";

const NewCollaborator = () => {
  const { id } = useParams();
  const { getProject, project, collaborator, addCollaborator, loading } =
    useProjects();

  useEffect(() => {
    getProject(id);
  }, []);
  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir colaborador(a) al Proyecto: {project.name}
      </h1>
      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
      {loading ? (
        "Cargando..."
      ) : (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
            <div className="flex justify-between items-center">
              <p>{collaborator?.name || ""}</p>
            </div>
            <button
              type="button"
              className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
              onClick={() => addCollaborator({ email: collaborator.email })}
            >
              Agregar al Proyecto
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default NewCollaborator;

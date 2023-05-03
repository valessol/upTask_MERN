import Alert from "../components/Alert";
import ProjectsPreview from "../components/ProjectsPreview";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects, loading, alert } = useProjects();
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      {alert.msg && <Alert alert={alert} />}
      <div className="bg-white shadow mt-10 rounded-lg">
        {projects?.length ? (
          projects.map((proj) => <ProjectsPreview key={proj._id} data={proj} />)
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            {loading ? "Cargando..." : "Aún no hay proyectos"}
          </p>
        )}
      </div>
    </>
  );
};
export default Projects;

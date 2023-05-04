import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

const Header = () => {
  const [modal, setModal] = useState(false);
  const { authLogout } = useAuth();
  const { projectsLogout } = useProjects();

  const handleClick = () => {
    setModal((prev) => !prev);
  };

  const handleLogout = () => {
    authLogout();
    projectsLogout();
    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleClick}
          >
            Buscar Proyecto
          </button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>

          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <Search onClose={handleClick} open={modal} />
    </header>
  );
};
export default Header;

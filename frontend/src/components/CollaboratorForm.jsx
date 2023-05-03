import { useState } from "react";
import { newCollaboratorForm } from "../constants/forms";
import Fields from "./Fields";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const CollaboratorForm = () => {
  const [email, setEmail] = useState("");
  const { alert, setAlert } = useProjects();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setAlert({
        msg: "Ingrese un email para realizar la búsqueda",
        type: "error",
      });
      return;
    }
  };
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alert alert={alert} />}
      <Fields
        fields={newCollaboratorForm}
        onChange={handleChange}
        values={email}
      />
      <input
        type="submit"
        className="bg-sky-600 w-full p-3 mt-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        value="Buscar"
      />
    </form>
  );
};
export default CollaboratorForm;

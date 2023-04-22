import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    setAlert({});
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "")
      return setAlert({ msg: "El email es obligatorio", type: "error" });

    try {
      const { data } = await axiosClient.post(`/users/reset-password`, {
        email,
      });
      setAlert({ msg: data.msg, type: "success" });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera el acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alert.msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="example@example.com"
            className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-700 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text slate-500 uppercase text-sm"
        >
          ¿Tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/registrar"
          className="block text-center my-5 text slate-500 uppercase text-sm"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default ResetPassword;

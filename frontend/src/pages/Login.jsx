import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({});
  //TODO: Añadir Spinner
  const [loading, setLoading] = useState(false);

  const validateFormValues = () => {
    const allFieldsCompleted = !Object.values(values).includes("");

    if (!allFieldsCompleted) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setAlert({});
    setLoading(false);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const areValidValues = validateFormValues();

    if (!areValidValues) {
      return setLoading(false);
    }

    try {
      const { password, email } = values;
      const { data } = await axiosClient.post(`/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAlert({ msg: data.msg, type: "success" });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
    setLoading(false);
    setValues({ name: "", email: "", password: "", repeatPassword: "" });
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión para administrar tus{" "}
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
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
          />
        </div>
        <div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            placeholder="********"
            className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-sky-700 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="block text-center my-5 text slate-500 uppercase text-sm"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link
          to="/reset-password"
          className="block text-center my-5 text slate-500 uppercase text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;

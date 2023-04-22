import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import Spinner from "../components/Spinner";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFormValues = () => {
    const { password, repeatPassword } = values;
    const allFieldsCompleted = !Object.values(values).includes("");

    if (!allFieldsCompleted) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        type: "error",
      });
      return false;
    }

    const areValidPasswords = password === repeatPassword;
    if (!areValidPasswords) {
      setAlert({
        msg: "Los passwords no coinciden",
        type: "error",
      });
      return false;
    }

    if (password.length < 6) {
      setAlert({
        msg: "Agrega un password de al menos 6 caracteres",
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
      const { password, name, email } = values;
      const { data } = await axiosClient.post(`/users`, {
        name,
        email,
        password,
      });
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
        Crea tu cuenta para administrar tus{" "}
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
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
            value={values.name}
            onChange={handleChange}
          />
        </div>
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
            placeholder="example@example.com"
            className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
            value={values.email}
            onChange={handleChange}
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
            placeholder="********"
            className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="repeatPassword"
          >
            Repetir Password
          </label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            placeholder="********"
            className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
            value={values.repeatPassword}
            onChange={handleChange}
          />
        </div>

        {loading ? (
          <button
            type="submit"
            className="bg-sky-700 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          >
            <Spinner
              style={{
                margin: "0",
                width: "24px",
                height: "24px",
                display: "inline-block",
                color: "white",
              }}
            />
          </button>
        ) : (
          <button
            type="submit"
            className="bg-sky-700 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          >
            Crear cuenta
          </button>
        )}
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text slate-500 uppercase text-sm"
        >
          ¿Tienes una cuenta? Inicia sesión
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

export default Register;

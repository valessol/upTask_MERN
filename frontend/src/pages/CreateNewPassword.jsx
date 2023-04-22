import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const CreateNewPassword = () => {
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/reset-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setValidToken(false);
        setAlert({ msg: error.response.data.msg, type: "error" });
      }
    };
    checkToken();
  }, []);

  const handleChange = (e) => {
    setAlert({});
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return setAlert({
        msg: "Debe contener al menos 6 caracteres",
        type: "error",
      });
    }

    try {
      const { data } = await axiosClient.post(
        `/users/reset-password/${token}`,
        { password }
      );
      setAlert({ msg: data.msg, type: "success" });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password para acceder a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alert.msg && <Alert alert={alert} />}
      {validToken && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="********"
              className="w-full mt-3 p-3 corder rounded-xl bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
    </>
  );
};

export default CreateNewPassword;

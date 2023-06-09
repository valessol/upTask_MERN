import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import Spinner from "../components/Spinner";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axiosClient(`/users/confirm/${id}`);
        setAlert({ msg: data.msg, type: "success" });
        setLoading(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
        //TODO: ver porque muestra mesnaje de token no válido
      } catch (error) {
        setAlert({ msg: error.response.data.msg, type: "error" });
        setLoading(false);
      }
    };
    confirmAccount();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta para acceder a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div>{alert.msg && <Alert alert={alert} />}</div>
      {loading && <Spinner text="Redirigiendo para iniciar sesión" />}
    </>
  );
};

export default ConfirmAccount;

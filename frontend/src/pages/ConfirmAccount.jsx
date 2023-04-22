import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axiosClient(`/users/confirm/${id}`);
        setAlert({ msg: data.msg, type: "success" });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, type: "error" });
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
    </>
  );
};

export default ConfirmAccount;

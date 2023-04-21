import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión para administrar tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
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
            type="passwrod"
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

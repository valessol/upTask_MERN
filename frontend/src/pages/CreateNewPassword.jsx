const CreateNewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password para acceder a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Nuevo Password
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
          value="Guardar nuevo password"
          className="bg-sky-700 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default CreateNewPassword;

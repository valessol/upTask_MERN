const Alert = ({ alert }) => {
  const messageClass = {
    error: "from-red-400 to-red-600",
    success: "from-sky-400 to-sky-600",
  };

  return (
    <div
      className={`${
        messageClass[alert.type]
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase, text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  );
};
export default Alert;

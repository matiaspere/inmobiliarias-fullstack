import React from "react";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const navigate = useNavigate();

  return (
    <div className="py-10">
      <h1 className="text-4xl my-10 font-extrabold text-center">
      Peressutti
        <span className="font-normal"> Propiedades</span>{" "}
      </h1>
      <h2 className="text-center text-2xl font-bold">
        Contraseña Reestablecida
      </h2>
      <div className="mt-8 mx-auto max-w-md">
        <button
          onClick={() => navigate("/auth/login")}
          className="w-full mx-auto bg-indigo-600 text-white font-medium rounded-md py-3 hover:bg-indigo-700 cursor-pointer"
          type="submit"
          value="Iniciar Sesion"
        >
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
};

export default Message;

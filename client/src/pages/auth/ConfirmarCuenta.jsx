import React from "react";
import { Link, useParams } from "react-router-dom";


const ConfirmarCuenta = () => {
  return (
    <>
      <div className="py-10">
        <h1 className="text-4xl my-10 font-extrabold text-center">
        Peressutti
          <span className="font-normal"> Propiedades</span>{" "}
        </h1>
      </div>

      <div className="bg-white shadow py-4 px-4 rounded-lg max-w-md mx-auto">
        <p className="bg-green-500 py-2 px-5 rounded-lg w-full fomt-bold text-center text-white uppercase">
          Cuenta creada con exito
        </p>
      </div>
      <Link
        to="/auth/login"
        className="text-center font-bold text-sm text-slate-600 uppercase mt-10 block"
      >
        iniciar sesion
      </Link>
    </>
  );
};

export default ConfirmarCuenta;

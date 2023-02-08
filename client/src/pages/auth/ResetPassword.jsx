import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const emailRef = React.useRef(null);
  const [password, setPassword] = React.useState();
  const [errores, setErrores] = React.useState();


  const handleSubmit = async (e, route) => {
    e.preventDefault();
    const email = emailRef.current.value;

    const options = {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    await fetch(`http://localhost:3001/${route}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.errores);
          setErrores(data.errores);
        } else {
          setPassword(true);
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {!password ? (
        <div className="py-10">
          <h1 className="text-4xl my-10 font-extrabold text-center">
          Peressutti
            <span className="font-normal"> Propiedades</span>{" "}
          </h1>
          <h2 className="text-center text-2xl font-bold">Iniciar Sesion</h2>

          {errores ? (
            <div className="max-w-md mx-auto my-10">
              {errores.map((i) => (
                <p
                  key={i.msg}
                  className="bg-red-600 text-white uppercase.text-xs text-center p-2 mb-1 font-bold rounded-md"
                >
                  {i.msg}
                </p>
              ))}
            </div>
          ) : (
            <div></div>
          )}

          <div className="mt-8 mx-auto max-w-md">
            <div className="bg-white py-8 px-4 shadow">
              <form
                className="space-y-5"
                onSubmit={(e) => handleSubmit(e, "auth/olvide-password")}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                  >
                    email
                  </label>
                  <input
                    ref={emailRef}
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                    placeholder="example@mail com"
                    type="email"
                    name="email"
                  ></input>
                </div>
                <div className="flex items-center justify-between ">
                  <Link to="/auth/registro" className="text-gray-500 text-xs">
                    Crear cuenta
                  </Link>
                  <Link to="/auth/login" className="text-gray-500 text-xs">
                    Iniciar Sesion
                  </Link>
                </div>
                <input
                  className="w-full bg-indigo-600 text-white font-medium rounded-md py-3 hover:bg-indigo-700 cursor-pointer"
                  type="submit"
                  value="Iniciar Sesion"
                ></input>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-10">
          <h1 className="text-4xl my-10 font-extrabold text-center">
          Peressutti
            <span className="font-normal"> Propiedades</span>{" "}
          </h1>
          <h2 className="text-center text-2xl font-bold">Contraseña reestablecida</h2>
          <p className="text-center py-6 font-bold text-gray-600">
            Hemos enviado un email con las instrucciones para establecer tu nueva contraseña
          </p>
        </div>
      )}
    </>
  );
};

export default ResetPassword;

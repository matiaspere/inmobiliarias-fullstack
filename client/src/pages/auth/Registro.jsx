import React from "react";
import { Link } from "react-router-dom";

const Registro = () => {
  const nombreRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const repetirPasswordRef = React.useRef(null);

  const [errores, setErrores] = React.useState();
  const [userCreated, setUserCreated] = React.useState();

  const handleSubmit = async (e, route) => {
    e.preventDefault();
    const nombre = nombreRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repetirPassword = repetirPasswordRef.current.value;

    const options = {
      method: "POST",
      body: JSON.stringify({ nombre, email, password, repetirPassword }),
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
          setUserCreated(true);
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {!userCreated ? (
        <div className="py-10">
          <h1 className="text-4xl my-10 font-extrabold text-center">
          Peressutti
            <span className="font-normal"> Propiedades</span>{" "}
          </h1>
          <h2 className="text-center text-2xl font-bold">Crear Cuenta</h2>

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
                onSubmit={(e) => handleSubmit(e, "auth/registro")}
              >
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                  >
                    nombre
                  </label>
                  <input
                    ref={nombreRef}
                    id="nombre"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                    placeholder="Juan"
                    type="text"
                    name="nombre"
                  ></input>
                </div>
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
                <div>
                  <label
                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                    htmlFor="password"
                  >
                    contraseña
                  </label>
                  <input
                    ref={passwordRef}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                    placeholder="********"
                    type="password"
                    name="password"
                  ></input>
                </div>

                <div>
                  <label
                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                    htmlFor="repetir_password"
                  >
                    repetir contraseña
                  </label>
                  <input
                    ref={repetirPasswordRef}
                    id="repetir_password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                    placeholder="********"
                    type="password"
                    name="repetir_password"
                  ></input>
                </div>

                <div className="flex items-center justify-between ">
                  <Link to="/auth/login" className="text-gray-500 text-xs">
                    Iniciar Sesion
                  </Link>
                  <Link
                    to="/auth/olvide-password"
                    className="text-gray-500 text-xs"
                  >
                    Olvide mi contraseña
                  </Link>
                </div>
                <input
                  className="w-full bg-indigo-600 text-white font-medium rounded-md py-3 hover:bg-indigo-700 cursor-pointer"
                  type="submit"
                  value="Crear Cuenta"
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
          <h2 className="text-center text-2xl font-bold">Cuenta creada</h2>
          <p className="text-center py-6 font-bold text-gray-600">
            Por favor revisa tu correo para validar tu cuenta
          </p>
        </div>
      )}
    </>
  );
};

export default Registro;

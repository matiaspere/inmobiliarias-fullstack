import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const NuevoPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const passwordRef = React.useRef(null);
  const repetirPasswordRef = React.useRef(null);

  const [password, setPassword] = React.useState();
  const [errores, setErrores] = React.useState();

  React.useEffect(() => {
    const getConfirmation = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      await fetch(
        `http://localhost:3001/auth/olvide-password/${token}`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrores(data.errores);
          } else {
            setPassword(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getConfirmation();
  }, []);

  const handleSubmit = async (e, route) => {
    e.preventDefault();

    const password = passwordRef.current.value;
    const repetirPassword = repetirPasswordRef.current.value;

    const options = {
      method: "POST",
      body: JSON.stringify({ password, repetirPassword }),
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
          navigate("/auth/confirmation-password");
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {password ? (
        <div>
          <div className="py-10">
            <h1 className="text-4xl my-10 font-extrabold text-center">
            Peressutti
              <span className="font-normal"> Propiedades</span>{" "}
            </h1>
            <h2 className="text-center text-2xl font-bold">
              Reestablecer Contraseña
            </h2>
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
          </div>
          <div className="mt-8 mx-auto max-w-md">
            <div className="bg-white py-8 px-4 shadow">
              <form
                className="space-y-5"
                onSubmit={(e) =>
                  handleSubmit(e, `auth/olvide-password/${token}`)
                }
              >
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
                <input
                  className="w-full bg-indigo-600 text-white font-medium rounded-md py-3 hover:bg-indigo-700 cursor-pointer"
                  type="submit"
                  value="Establecer Contraseña"
                ></input>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>usuario no existe</p>
      )}
    </>
  );
};

export default NuevoPassword;

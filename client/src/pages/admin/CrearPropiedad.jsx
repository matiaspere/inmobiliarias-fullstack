import React from "react";
import Layout from "../../components/Layout";

const CrearPropiedad = () => {
  const [categorias, setCategorias] = React.useState();
  const [precios, setPrecios] = React.useState();
  const [errores, setErrores] = React.useState();

  const tituloRef = React.useRef(null);
  const descripcionRef = React.useRef(null);
  const categoriaRef = React.useRef(null);
  const precioRef = React.useRef(null);
  const habitacionesRef = React.useRef(null);
  const estacionamientoRef = React.useRef(null);
  const bañosRef = React.useRef(null);
  const direccionRef = React.useRef(null);

  const optionsMax = 10;
  const options = [];

  for (let k = 1; k <= optionsMax; k++) {
    options.push(k);
  }

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3001/propiedades/datos`);
      const datos = await res.json();
      setCategorias(datos.categorias);
      setPrecios(datos.precios);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e, route) => {
    // e.preventDefault();
    const titulo = tituloRef.current.value;
    const descripcion = descripcionRef.current.value;
    const categoria = categoriaRef.current.value;
    const precio = precioRef.current.value;
    const habitaciones = habitacionesRef.current.value;
    const estacionamiento = estacionamientoRef.current.value;
    const baños = bañosRef.current.value;
    const direccion = direccionRef.current.value;

    const options = {
      method: "POST",
      body: JSON.stringify({
        titulo,
        descripcion,
        categoria,
        precio,
        habitaciones,
        estacionamiento,
        baños,
        direccion,
      }),
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
          // setUserCreated(true);
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Layout>
        <div className="py-10">
          <h1 className="text-4xl my-10 font-extrabold text-center">
            Peressutti
            <span className="font-normal"> Propiedades</span>{" "}
          </h1>
        </div>
        <h2 className="text-center text-2xl font-bold">Crear Propiedad</h2>

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

        <div className="bg-white shadow py-8 px-4 rounded mx-auto max-w-4xl my-10 md:px-10">
          <form
            className="space-y-5"
            onSubmit={(e) => handleSubmit(e, "propiedades/guardar")}
          >
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Informacion General
            </h3>
            <p className=" text-gray-600 ">
              Añade informacion sobre la propiedad en venta
            </p>

            <div>
              <label
                htmlFor="titulo"
                className="block text-sm uppercase text-gray-500 mb-2 font-bold"
              >
                titulo del anuncio
              </label>
              <input
                ref={tituloRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                id="titulo"
                placeholder="Ej: Casa en la playa 2 dormitorios"
                type="text"
                name="titulo"
              ></input>
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm uppercase text-gray-500 mb-2 font-bold"
              >
                Descripcion
              </label>
              <textarea
                ref={descripcionRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                id="descripcion"
                placeholder="Fabulosa casa bien ubicada con 2 baños, cochera y living comedor."
                name="descripcion"
              ></textarea>
            </div>

            <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
              <div className="md:w-1/2">
                <label
                  htmlFor="categoria"
                  className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                >
                  categoria
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                >
                  <option value=""> - Seleccione -</option>
                  {categorias?.map((i) => (
                    <option key={i.id}>{i.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="md:w-1/2">
                <label
                  htmlFor="precio"
                  className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                >
                  precio
                </label>
                <select
                  id="precio"
                  name="precio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                >
                  <option value=""> - Seleccione -</option>
                  {precios?.map((i) => (
                    <option key={i.id}>{i.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
              <div className="md:w-1/3">
                <label
                  htmlFor="habitaciones"
                  className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                >
                  habitaciones
                </label>
                <select
                  id="habitaciones"
                  name="habitaciones"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                >
                  <option value=""> - Seleccione -</option>
                  {options.map((opt) => (
                    <option value={opt} key={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:w-1/3">
                <label
                  htmlFor="estacionamiento"
                  className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                >
                  estacionamiento
                </label>
                <select
                  id="estacionamiento"
                  name="estacionamiento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                >
                  <option value=""> - Seleccione -</option>
                  {options.map((opt) => (
                    <option value={opt} key={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:w-1/3">
                <label
                  htmlFor="wc"
                  className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                >
                  baños
                </label>
                <select
                  id="wc"
                  name="wc"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                >
                  <option value=""> - Seleccione -</option>
                  {options.map((opt) => (
                    <option value={opt} key={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="direccion"
                className="block text-sm uppercase text-gray-500 mb-2 font-bold"
              >
                direccion
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                id="direccion"
                placeholder="Calle 123, Ciudad, CP."
                name="direccion"
              ></input>
            </div>
            <input
              className="w-full bg-indigo-600 text-white font-medium rounded-md py-3 hover:bg-indigo-700 cursor-pointer"
              type="submit"
              value="Añadir Imagen"
            ></input>
          </form>
          <div id="mapa" className="h-96 my-10"></div>
        </div>
      </Layout>
    </div>
  );
};

export default CrearPropiedad;

// React.useEffect(() => {
//   const body = document.querySelector("body");
//   const head = document.querySelector("head");

//   const script1 = document.createElement("script");
//   const script2 = document.createElement("script");
//   const script3 = document.createElement("script");
//   const script4 = document.createElement("script");
//   const scriptMapa = document.createElement("script");

//   const link = document.createElement("link");

//   script1.setAttribute(
//     "src",
//     "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
//   );
//   script2.setAttribute(
//     "src",
//     "https://unpkg.com/esri-leaflet@3.0.8/dist/esri-leaflet.js"
//   );
//   script3.setAttribute(
//     "src",
//     "https://unpkg.com/esri-leaflet-geocoder@2.2.13/dist/esri-leaflet-geocoder.js"
//   );
//   script4.setAttribute(
//     "src",
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet-geosearch/2.7.0/bundle.min.js"
//   );
//   scriptMapa.setAttribute("src", "/js/mapa.js");

//   link.setAttribute("rel", "stylesheet");
//   link.setAttribute(
//     "href",
//     "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
//   );

//   body.appendChild(script1);
//   body.appendChild(script2);
//   body.appendChild(script3);
//   body.appendChild(script4);
//   body.appendChild(scriptMapa);
//   head.appendChild(link);
// }, []);

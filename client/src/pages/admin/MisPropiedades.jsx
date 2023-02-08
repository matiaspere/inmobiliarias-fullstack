import React from "react";
import Layout from "../../components/Layout";
const MisPropiedades = () => {
  return (
    <div>
      <Layout>
        <a
          href="/propiedades/crear"
          className="rounded py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-bold text-center text-white uppercase my-5 inline-block w-full sm:w-auto"
        >
          Publicar Propiedad
        </a>
      </Layout>
    </div>
  );
};

export default MisPropiedades;

import React from "react";

const Layout = ({children}) => {
  return (
    <>
      <header className="bg-indigo-600 py-5">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl text-white font-extrabold text-center">
            Peressutti
            <span className="font-normal"> Propiedades</span>
          </h1>
          <nav
            className="text-sm md:flex md:items-center md:gap-3 font-bold
          text-white hidden"
          >
            <a href=""> Mis Propiedades</a>
            <a href=""> Mi Perfil</a>
            <a href="" className="bg-indigo-800 py-2 px-10 rounded-lg">
              Cerrar Sesion
            </a>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;

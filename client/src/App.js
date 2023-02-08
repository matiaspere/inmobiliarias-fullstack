import React from "react";
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components Auth
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";
import ConfirmarCuenta from "./pages/auth/ConfirmarCuenta";
import ResetPassword from "./pages/auth/ResetPassword";
import NuevoPassword from "./pages/auth/NuevoPassword";
import Message from "./pages/auth/Message";
// Components Admin
import MisPropiedades from "./pages/admin/MisPropiedades";
import CrearPropiedad from "./pages/admin/CrearPropiedad";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/confirmar/:token" element={<ConfirmarCuenta />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/registro" element={<Registro />} />
          <Route path="/auth/olvide-password" element={<ResetPassword />} />
          <Route
            path="/auth/olvide-password/:token"
            element={<NuevoPassword />}
          />
          <Route path="/auth/confirmation-password" element={<Message />} />
          <Route path="/mis-propiedades" element={<MisPropiedades />} />
          <Route path="/propiedades/crear" element={<CrearPropiedad />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

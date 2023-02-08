import express from "express";
import {
  registrar,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  autenticar,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/registro", registrar);
router.get("/confirmar/:token", confirmar);

router.post("/login", autenticar);

router.post("/olvide-password", resetPassword);

router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

export default router;

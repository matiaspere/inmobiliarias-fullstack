import express from "express";
import { datos, guardar } from "../controllers/propiedadesController.js";

const router = express.Router();


router.get("/propiedades/datos", datos);
router.post("/propiedades/guardar", guardar)

export default router;

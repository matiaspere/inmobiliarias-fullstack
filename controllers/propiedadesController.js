import { body, validationResult } from "express-validator";
import Precio from "../models/Precio.js";
import Categoria from "../models/Categoria.js";

const datos = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);
  res.json({
    categorias,
    precios,
  });
};

const guardar = async (req, res) => {
  await body("titulo")
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .run(req);

  await body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .run(req);

  let resultado = validationResult(req);
  console.log(resultado);
  if (!resultado.isEmpty()) {
    return res.json({
      error: true,
      errores: resultado.array(),
    });
  }
};

export { datos, guardar };

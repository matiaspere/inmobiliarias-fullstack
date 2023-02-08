import { check, body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { generarToken, generarJWT } from "../helpers/tokens.js";
import { emailReigstro, emailOlvidePassword } from "../helpers/emails.js";

const autenticar = async (req, res) => {
  console.log(req.body.email, req.body.password);
  await body("email")
    .isEmail()
    .notEmpty()
    .withMessage("El email is obligatorio")
    .run(req);

  await body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .run(req);

  // Verify email and password
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.json({
      error: true,
      errores: resultado.array(),
    });
  }

  const { email, password } = req.body;

  // Verify that user exists
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.json({
      error: true,
      errores: [{ msg: "el email no se encuentra registrado" }],
    });
  }

  console.log(usuario);
  // // Verify that user is confirmed
  if (!usuario.confirmado) {
    return res.json({
      error: true,
      errores: [{ msg: "tu cuenta no ha sido confirmada" }],
    });
  }

  // Verify user's password
  if (!usuario.verificarPassword(password)) {
    return res.json({
      error: true,
      errores: [{ msg: "la contraseña es incorrecta" }],
    });
  }

  // Auth user
  const token = generarJWT({ id: usuario.id, nombre: usuario.nombre });

  // Send token
  return res.json({
    token: token,
  });
};

const registrar = async (req, res) => {
  // Validation
  await body("nombre")
    .notEmpty()
    .withMessage("Nombre no puede ir vacio")
    .run(req);

  await body("email")
    .isEmail()
    .withMessage("Formato de email invalido")
    .run(req);

  await body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .run(req);

  await body("repetirPassword")
    .equals(req.body.password)
    .withMessage("Las contraseñas no coinciden")
    .run(req);

  // Check result
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.json({
      error: true,
      errores: resultado.array(),
    });
  }

  // Verify user duplicated
  const existeUsuario = await Usuario.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (existeUsuario) {
    return res.json({
      error: true,
      errores: [{ msg: "El usuario ya esta registrado" }],
    });
  }

  // Save new user in DB
  const usuario = await Usuario.create({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    token: generarToken(),
  });

  // Send email confirmation
  emailReigstro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  // Confirmation page
  res.json({
    error: false,
  });
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.json({
      error: true,
    });
  }

  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.json({
    confirmado: true,
  });
  console.log(usuario);

};

const resetPassword = async (req, res) => {
  // Validation
  await body("email")
    .isEmail()
    .withMessage("Formato de email invalido")
    .run(req);

  // Check result
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.json({
      error: true,
      errores: resultado.array(),
    });
  }

  const { email } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.json({
      error: true,
      errores: [{ msg: "El email no pertenece a ningun usuario" }],
    });
  }

  // Generate token
  usuario.token = generarToken();
  await usuario.save();

  // Send email
  emailOlvidePassword({
    email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  // Render page with message
  res.json({
    error: false,
  });
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.json({
      message: "Hubo un error al validar tu informacion.",
      error: true,
    });
  }

  res.json({
    error: false,
  });
};

const nuevoPassword = async (req, res) => {
  await check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .run(req);

  await body("repetirPassword")
    .equals(req.body.password)
    .withMessage("Las contraseñas no coinciden")
    .run(req);

  // Check result
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.json({
      error: true,
      errores: resultado.array(),
    });
  }

  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ where: { token } });

  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  usuario.token = null;

  await usuario.save();

  res.json({
    error: false,
  });
};

export {
  autenticar,
  registrar,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};

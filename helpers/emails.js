import nodemailer from "nodemailer";

const emailReigstro = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = data;

  await transport.sendMail({
    from: "ojedapropiedades.com",
    to: email,
    subject: "Confirma tu cuenta en Ojeda Propiedades",
    text: "Confirma tu cuenta en Ojeda Propiedades",
    html: `
        <p> Hola ${nombre}, por favor valida tu cuenta en ojedapropiedades.com</p>

        <p>Haz clic en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}">Confirmar Cuenta</a> </p>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      `,
  });
};

const emailOlvidePassword = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = data;

  await transport.sendMail({
    from: "ojedapropiedades.com",
    to: email,
    subject: "Reestablece tu password en Ojeda Propiedades",
    text: "Reestablece tu password en Ojeda Propiedades",
    html: `
        <p> Hola ${nombre}, has solicitado reestablecer tu password en ojedapropiedades.com</p>

        <p>Haz clic en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/olvide-password/${token}">Reestablecer contraseña</a> </p>

        <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
      `,
  });
};

export { emailReigstro, emailOlvidePassword };

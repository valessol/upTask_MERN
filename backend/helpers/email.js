import nodemailer from "nodemailer";

export const registerEmail = async (data) => {
  const { name, email, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailInfo = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <account@uptask.com>',
    to: email,
    subject: "UpTask - Confirmación de la cuenta",
    text: "Comprueba tu cuenta en Uptask",
    html: `
      <p>Hola ${name}, gracias por registrarte en UpTask</p>
      <p>Tu cuenta está casi lista, sólo debes verificarla haciendo click en el siguiente enlace: </p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Verificar cuenta</a>
      <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  });
};

export const resetPasswordEmail = async (data) => {
  const { name, email, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailInfo = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <account@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu password",
    text: "Reestablece tu password",
    html: `
      <p>Hola ${name}, has solicitado reestablecer tu password</p>
      <p>Sigue el siguiente enlace para generar un nuevo password: </p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reestablecer password</a>
      <p>Si no solicitaste este email, puedes ignorar este mensaje.</p>
    `,
  });
};

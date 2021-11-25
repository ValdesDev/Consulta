const router = require("express").Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const myMail = process.env.EMAIL;

/* TRANSPORTE los emails se envian desde esta cuenta */

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })
);

router.post("/contact-mail/", async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  const contactMail = {
    from: myMail,
    to: myMail,
    subject: `Mensaje enviado por ${email} para agenda psicológica`,
    text: `Mensaje de ${name} con correo ${email} y teléfono ${phone}. Mensaje:${message}`,
  };
  try {
    await transporter.sendMail(contactMail);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
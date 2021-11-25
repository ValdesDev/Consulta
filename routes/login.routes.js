const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Psychologist = require("../models/Psychologist.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");


/* LOGIN */

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});


router.post("/login", isLoggedOut, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("auth/login", { errorMsg: "You need to fill all inputs" });
  }
  try {
    const psychologistFromDB = await Psychologist.findOne({ email });
    if (!psychologistFromDB) {
      res.render("auth/login", { errorMsg: "El usuario no existe" });
    } else {
      const passwordsMatch = await bcrypt.compare(
        password,
        psychologistFromDB.password
      );
      if (!passwordsMatch) {
        res.render("auth/login", { errorMsg: "Contraseña Incorrecta" });
      } else {
        req.session.user = psychologistFromDB;
        res.redirect("/psychologist");
      }
    }
  } catch (err) {
    next(err);
  }
});

/* LOGOUT */

router.post("/logout", isLoggedIn, async (req, res, next) => {
  res.clearCookie("connect.sid", { path: "/" }); //REVISAR
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

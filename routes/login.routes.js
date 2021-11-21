const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Psychologist = require("../models/Psychologist.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

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
      res.render("auth/login", { errorMsg: "The user does not exist" });
    } else {
      const passwordsMatch = await bcrypt.compare(
        password,
        psychologistFromDB.password
      );
      if (!passwordsMatch) {
        res.render("auth/login", { errorMsg: "Incorrect password" });
      } else {
        req.session.user = psychologistFromDB;
        res.redirect("/psychologist");
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/logout", isLoggedIn, async (req, res, next) => {
  res.clearCookie("connect.sid", { path: "/" });//REVISAR
  try {
    const error = await req.session.destroy();
    if (error) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

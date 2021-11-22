const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Psychologist = require("../models/Psychologist.model");

const saltRounds = 10;

const isLoggedOut = require("../middleware/isLoggedOut");

/* GET form to create new user */
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

/* POST create new user */
router.post("/signup", isLoggedOut, async (req, res) => {
  const { name, lastName, password, email, phone, presentation } = req.body;
  if (!email) {
    return res
      .status(400)
      .render("auth/signup", { errorMessage: "Please provide your Email." });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  try {
    const foundPsychologist = await Psychologist.findOne({ email });
    if (foundPsychologist) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: "Email already taken." });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await Psychologist.create({
      name,
      lastName,
      password: hashedPassword,
      email,
      phone,
      presentation
    });
    req.session.user = createdUser;
    res.redirect("/psychologist"); //revisar ruta
    
  } catch (err) {
    console.log(err);
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).render("auth/signup", {
        errorMessage:
          "Username need to be unique. The username you chose is already in use.",
      });
    }
    return res
      .status(500)
      .render("auth/signup", { errorMessage: error.message });
  }
});

module.exports = router;

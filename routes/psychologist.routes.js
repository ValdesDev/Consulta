const router = require("express").Router();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const saltRounds = 10;

const Client = require("../models/Client.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/psychologist", isLoggedIn, (req, res) => {
  
  res.render("restricted/psychologist");
});

module.exports = router;

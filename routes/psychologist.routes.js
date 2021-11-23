const router = require("express").Router();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const saltRounds = 10;

const Psychologist = require("../models/Psychologist.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/psychologist", isLoggedIn, async (req, res) => {
  const user = req.session.user;
  const loggedPsychologist = await Psychologist.findById(user._id).populate("clients");
  const{clients,name} = loggedPsychologist;
  const activeClients = clients.filter(client => client.active);
  res.render("restricted/psychologist",{activeClients,name});
});

module.exports = router;

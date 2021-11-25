const router = require("express").Router();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const saltRounds = 10;

const Psychologist = require("../models/Psychologist.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

/* View Psychologist */

router.get("/psychologist", isLoggedIn, async (req, res) => {
  const user = req.session.user;
  const loggedPsychologist = await Psychologist.findById(user._id)
    .populate("clients")
    .populate({
      path: "appointments",
      populate: {
        path: "client",
        model: "Client",
      },
    });
  const { clients, appointments, name } = loggedPsychologist;
  const activeClients = clients.filter((client) => client.active);
  res.render("restricted/psychologist", {
    activeClients,
    appointments: encodeURIComponent(JSON.stringify(appointments)),
    name,
  });
});

router.get("/psychologist/archive", isLoggedIn, async (req, res) => {
  const user = req.session.user;
  const loggedPsychologist = await Psychologist.findById(user._id).populate(
    "clients"
  );
  res.render("restricted/full-list", loggedPsychologist);
});

/* Modify Psy */

router.post("/modify-psychologist", async (req, res, next) => {
  const user = req.session.user;
  const modifiedUser = req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  modifiedUser.password = await bcrypt.hash(modifiedUser.password, salt);
  console.log( "======>",modifiedUser);
  try {
    await Psychologist.findByIdAndUpdate(user._id, modifiedUser);
    res.redirect("/psychologist/archive");
  } catch (err) {
    console.log("err", err);
  }
});

/* Delete Psy */

router.get("/delete-psychologist", async (req, res, next) => {
  const user = req.session.user;
  try {
    await Psychologist.findByIdAndRemove(user._id);
    res.clearCookie("connect.sid", { path: "/" }); //REVISAR
    await req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log("err", err);
  }
});

module.exports = router;

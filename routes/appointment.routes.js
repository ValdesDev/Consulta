const router = require("express").Router();

const Psychologist = require("../models/Psychologist.model");
const Appointment = require("../models/Appointment.model");

const isLoggedIn = require("../middleware/isLoggedIn");

/* Create new Appointment */

router.post("/create-appointment/:id", isLoggedIn, async (req, res, next) => {
  const { date, time, summary } = req.body;
  const splitTime = time.split(":");
  process.env.TZ = "Europe/Madrid";
  const fullTime = new Date(date);
  fullTime.setHours(splitTime[0]);
  fullTime.setMinutes(splitTime[1]);
  try {
    const user = req.session.user;
    const client = req.params.id;
    const createdAppointment = await Appointment.create({
      date: fullTime,
      summary,
      client,
    });

    await Psychologist.findByIdAndUpdate(
      user._id,
      { $push: { appointments: createdAppointment._id } },
      { new: true }
    );

    res.redirect("/psychologist");
  } catch (err) {
    console.log(err);
  }
});

/* Delete Appointment */


router.get("/delete-appointment/:id", async (req, res, next) => {
  try {
    await Appointment.findByIdAndRemove(req.params.id);
    res.redirect("/psychologist");
  } catch (err) {
    console.log("err", err);
  }
});

module.exports = router;

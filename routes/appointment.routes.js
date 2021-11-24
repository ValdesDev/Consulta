const router = require("express").Router();

const Psychologist = require("../models/Psychologist.model");
const Appointment = require("../models/Appointment.model");

const isLoggedIn = require("../middleware/isLoggedIn");

/* Create new Appointment */

router.post("/create-appointment/:id", isLoggedIn, async (req, res, next) => {
  const { date, time, summary } = req.body;
  const splitTime = time.split(":");
  const fullTime = new Date(date);
  fullTime.setUTCHours(splitTime[0]);
  fullTime.setUTCMinutes(splitTime[1]);
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

module.exports = router;

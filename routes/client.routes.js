const router = require("express").Router();

const Psychologist = require("../models/Psychologist.model");
const Client = require("../models/Client.model");

/* Create new Client */
router.post("/psychologist", async (req, res, next) => {
  const { name, lastName, lastName2, age, email, phone } = req.body;
  try {
    const user = req.session.user;
    if (user) {
      const createdClient = await Client.create({
        name,
        lastName,
        lastName2,
        age,
        email,
        phone,
      });

      const updatedPsychologist = await Psychologist.findByIdAndUpdate(
        user._id,
        { $push: { clients: createdClient._id } },
        { new: true }
      );

      res.redirect("/psychologist");
    } else {
      res.redirect("/auth/login");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

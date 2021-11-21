const { Schema, model } = require("mongoose");

const psychologistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email not valid"],
    },
    phone: {
      type: Number,
      unique: true,
      match: [/^[679]{1}[0-9]{8}$/, "Number not valid"],
    },
    presentation: { type: String },
    clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  },
  {
    timestamps: true,
  }
);

const Psychologist = model("Psychologist", psychologistSchema);

module.exports = Psychologist;

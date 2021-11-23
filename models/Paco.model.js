const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    lastName2: { type: String },
    age: { type: Number, max: 99 },
    active: { type: Boolean, default: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email not valid"],
    },
    phone: { type: Number, unique: true,match:[/^[679]{1}[0-9]{8}$/ ,"Number not valid"] },
  },
  {
    timestamps: true,
  }
);
// clientSchema.index({ name: 1, lastName: 1, lastName2: 1 }, { unique: true });  Los tres campos conjuntos debe ser unica.

const Client = model("Client", clientSchema);

module.exports = Client;

const mongoose = require("mongoose");

const PropiertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type_: { type: String, enum: ["house", "room", "hostel"], required: true },
  address: { type: String, required: true },
  rooms: { type: Number, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  picture: { type: String },
});

/**
 * Export the model
 */

mongoose.model("propierty", PropiertySchema);

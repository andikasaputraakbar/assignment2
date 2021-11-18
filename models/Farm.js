const mongoose = require("mongoose");
const { Schema } = mongoose;

const farmSchema = new Schema(
  {
    farmname: { type: String, required: true },
    food: { type: Number, default: 0, min: 0, max: 20 },
  },
  {
    timestamps: true,
  }
);

const Farm = mongoose.model("farm", farmSchema);
module.exports = Farm;

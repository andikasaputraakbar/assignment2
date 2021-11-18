const mongoose = require("mongoose");
const { Schema } = mongoose;

const barrackSchema = new Schema(
  {
    barrackname: { type: String, required: true },
    soldier: { type: Number, default: 0, min: 0, max: 10 },
  },
  {
    timestamps: true,
  }
);

const Barrack = mongoose.model("barrack", barrackSchema);
module.exports = Barrack;

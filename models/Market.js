const mongoose = require("mongoose");
const { Schema } = mongoose;

const marketSchema = new Schema(
  {
    marketname: { type: String, required: true },
    gold: { type: Number, default: 0, min: 0, max: 20 },
  },
  {
    timestamps: true,
  }
);

const Market = mongoose.model("market", marketSchema);
module.exports = Market;

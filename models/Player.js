const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gold: { type: Number, min: 0, max: 1000, default: 100 },
    food: { type: Number, min: 0, max: 1000, default: 100 },
    soldier: { type: Number, min: 0, max: 500, default:0 },
    medal: {type:Number, min: 0 , default:0},
    marketId: [{ type: Schema.Types.ObjectId, ref: "market" }],
    farmId: [{ type: Schema.Types.ObjectId, ref: "farm" }],
    barrackId: [{ type: Schema.Types.ObjectId, ref: "barrack" }],
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("player", playerSchema);
module.exports = Player;

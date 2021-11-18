import { Schema, Model, model } from "mongoose";
import BarrackInterface from "../interface/barrack.interface";

const barrackSchema = new Schema(
  {
    barrackname: { type: String, required: true },
    soldier: { type: Number, default: 0, min: 0, max: 10 },
  },
  {
    timestamps: true,
  }
);

const Barrack: Model<BarrackInterface> = model<BarrackInterface>(
  "barrack",
  barrackSchema
);

export default Barrack;


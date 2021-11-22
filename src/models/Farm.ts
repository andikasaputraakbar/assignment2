import { Schema,Model,model } from "mongoose";
import FarmInterface from "../interface/farm.interface";

const farmSchema = new Schema(
  {
    farmname: { type: String, required: true },
    food: { type: Number, default: 0, min: 0, max: 20 },
  },
  {
    timestamps: true,
  }
);

const Farm: Model<FarmInterface> = model<FarmInterface>("farm", farmSchema);

export default Farm;

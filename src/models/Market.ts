import MarketInterface from "../interface/market.interface";
import { Schema, Model, model } from "mongoose";

const marketSchema = new Schema(
  {
    marketname: { type: String, required: true },
    gold: { type: Number, default: 0, min: 0, max: 20 },
  },
  {
    timestamps: true,
  }
);

const Market : Model<MarketInterface> = model<MarketInterface>("market", marketSchema);
export default Market;

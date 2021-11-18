import { NextFunction, Request, Response } from "express";
import Market from "../models/Market";
import Player from "../models/Player";

class MarketController {
  static async showMarket(req: Request, res: Response, next: NextFunction) {
    const { idPlayer } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "marketId"
      );
      if (dataPlayer.marketId.length === 0) {
        throw { name: "NOT_FOUND_ALL" };
      } else {
        res
          .status(200)
          .json({ message: "Market shown", data: dataPlayer.marketId });
      }
    } catch (err) {
      next(err);
    }
  }

  static async createMarket(req: Request, res: Response, next: NextFunction) {
    const { marketname } = req.body;
    const { idPlayer } = req.params;

    try {
      const player = await Player.findOne({ _id: idPlayer });
      if (player) {
        if (player.gold <= 30 && player.food <= 10) {
          throw { name: "UNDER_LIMIT" };
        }
        const create = await Market.create({ marketname });
        const result = await Player.findByIdAndUpdate(
          idPlayer,
          {
            $push: { marketId: create._id.toString() },
            $inc: { gold: -30, food: -10 },
          },
          { new: true }
        );
        res.status(201).json({ message: "Market created", data: result });
      } else {
        throw { name: "NOT_FOUND" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async findMarket(req: Request, res: Response, next: NextFunction) {
    const { idPlayer, idMarket } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "marketId"
      );
      const dataMarket = await Market.findById({ _id: idMarket });
      if (!dataMarket && !dataPlayer) {
        throw { name: "NOT_FOUND_SPECIFIC" };
      } else {
        res.status(200).json({ message: `Market found`, data: dataMarket });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateMarket(req: Request, res: Response, next: NextFunction) {
    const { idPlayer, idMarket } = req.params;
    const { marketname } = req.body;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "marketId"
      );
      const dataMarket = await Market.findOneAndUpdate(
        { _id: idMarket },
        { marketname },
        { new: true }
      );
      res
        .status(202)
        .json({ message: `Market name updated`, data: dataMarket });
    } catch (err) {
      next(err);
    }
  }

  static async deleteMarket(req: Request, res: Response, next: NextFunction) {
    const { idPlayer, idMarket } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "marketId"
      );
      if (!dataPlayer) {
        throw { name: "NOT_FOUND" };
      } else {
        const data = await Player.findByIdAndUpdate(
          { _id: idPlayer },
          { $pull: { marketId: idMarket } }
        );
        const result = await Market.findByIdAndDelete({ _id: idMarket });
        res.status(202).json({ message: `Market deleted`, data: result });
      }
    } catch (err) {
      next(err);
    }
  }
  static async collectMarket(req: Request, res: Response, next: NextFunction) {
    const { idPlayer, idMarket } = req.params;
    let isValid = false;

    try {
      const data = await Player.findOne({ _id: idPlayer }).populate("marketId");
      if (data) {
        let gold = 0;
        const market_temp:any = data.marketId;
        for (let i = 0; i < market_temp.length; i++) {
          if (market_temp[i]._id.toString() == idMarket) {
            gold = market_temp[i].gold;
            isValid = true;
          }
        }
        if (isValid) {
          await Market.findByIdAndUpdate(
            {
              _id: idMarket,
            },
            { $inc: { gold: -gold } },
            { new: true }
          );

          const updateDataPlayer = await Player.findByIdAndUpdate(
            { _id: idPlayer },
            { $inc: { gold: gold } },
            { new: true }
          ).populate("marketId");

          res.status(200).json({
            status: "Resources collected",
            data: updateDataPlayer,
          });
        } else {
          throw { name: "NOT_FOUND_ALL" };
        }
      } else {
        throw { name: "NOT_FOUND_ALL" };
      }
    } catch (err) {
      next(err);
    }
  }
}

export default MarketController;

import { NextFunction, Request, Response } from "express";
import Barrack from "../models/Barrack";
import Player from "../models/Player";

class BarrackController {
  static async showBarrack(req:Request, res:Response, next:NextFunction) {
    const { idPlayer } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "barrackId"
      );
      if (dataPlayer.barrackId.length === 0) {
        throw { name: "NOT_FOUND_ALL" };
      } else {
        res
          .status(200)
          .json({ message: "Barrack shown", data: dataPlayer.barrackId });
      }
    } catch (err) {
      next(err);
    }
  }

  static async createBarrack(req:Request, res:Response, next:NextFunction) {
    const { barrackname } = req.body;
    const { idPlayer } = req.params;
    try {
      const player = await Player.findOne({ _id: idPlayer });

      if (player) {
        if (player.gold <= 30 && player.food <= 30) {
          throw { name: "UNDER_LIMIT" };
        }

        const barrack_total = player.barrackId.length;
        if (barrack_total < 30) {
          const create = await Barrack.create({ barrackname });
          const result = await Player.findByIdAndUpdate(
            idPlayer,
            {
              $push: { barrackId: create._id.toString() },
              $inc: { gold: -30, food: -30 },
            },
            { new: true }
          );
          res.status(201).json({ message: "Barrack created", data: result });
        } else {
          throw { name: "UNDER_LIMIT" };
        }
      } else {
        throw { name: "NOT_FOUND" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async findBarrack(req:Request, res:Response, next:NextFunction) {
    const { idPlayer, idBarrack } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "barrackId"
      );
      const dataBarrack = await Barrack.findById({ _id: idBarrack });
      if (!dataBarrack && !dataPlayer) {
        throw { name: "NOT_FOUND_SPECIFIC" };
      } else {
        res.status(200).json({ message: `Barrack found`, data: dataBarrack });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateBarrack(req:Request, res:Response, next:NextFunction) {
    const { idPlayer, idBarrack } = req.params;
    const { barrackname } = req.body;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "barrackId"
      );
      const dataBarrack = await Barrack.findOneAndUpdate({ _id:idBarrack },{barrackname},{new:true});
      res.status(202).json({ message: `Barrack name updated`, data: dataBarrack });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBarrack(req:Request, res:Response, next:NextFunction) {
    const { idPlayer, idBarrack } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "barrackId"
      );
      if (!dataPlayer) {
        throw { name: "NOT_FOUND" };
      } else {
        const data = await Player.findByIdAndUpdate(
          { _id: idPlayer },
          { $pull: { barrackId: idBarrack } }
        );
        const result = await Barrack.findByIdAndDelete({ _id: idBarrack });
        res.status(202).json({ message: `Barrack deleted`, data: result });
      }
    } catch (err) {
      next(err);
    }
  }

  static async collectBarrack(req:Request, res:Response, next:NextFunction) {
    const { idPlayer, idBarrack } = req.params;
    let isValid = false;

    try {
      const data = await Player.findOne({ _id: idPlayer }).populate(
        "barrackId"
      );
      if (data) {
        let soldier = 0;
        const barrack_temp:any = data.barrackId;
        for (let i = 0; i < barrack_temp.length; i++) {
          if (barrack_temp[i]._id.toString() == idBarrack) {
            soldier = barrack_temp[i].soldier;
            isValid = true;
          }
        }
        if (isValid) {
          await Barrack.findByIdAndUpdate(
            {
              _id: idBarrack,
            },
            { $inc: { soldier: -soldier } },
            { new: true }
          );

          const updateDataPlayer = await Player.findByIdAndUpdate(
            { _id: idPlayer },
            { $inc: { soldier: soldier } },
            { new: true }
          ).populate("barrackId");

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

export default BarrackController;

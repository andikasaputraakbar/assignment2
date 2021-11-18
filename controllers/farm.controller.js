const Farm = require("../models/Farm");
const Player = require("../models/Player");

class farmController {
  static async showFarm(req, res, next) {
    const { idPlayer } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "farmId"
      );
      console.log(dataPlayer.farmId)
      if (dataPlayer.farmId.length === 0) {
        throw { name: "NOT_FOUND_ALL" };
      } else {
        res
          .status(200)
          .json({ message: "Farm shown", data: dataPlayer.farmId });
      }
    } catch (err) {
      next(err);
    }
  }

  static async createFarm(req, res, next) {
    const { farmname } = req.body;
    const { idPlayer } = req.params;
    
    try {
      const player = await Player.findOne({ _id: idPlayer });
      if (player) {
        if (player.gold <= 10 && player.food <= 30) {
          throw { name: "UNDER_LIMIT" };
        }
        
        const create = await Farm.create({ farmname });
        const result = await Player.findByIdAndUpdate(
          idPlayer,
          {
            $push: { farmId: create._id.toString() },
            $inc: { gold: -10, food: -30 },
          },
          { new: true }
        );
        res.status(201).json({ message: "Farm created", data: result });
      } else {
        throw { name: "NOT_FOUND" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async findFarm(req, res, next) {
    const { idPlayer, idFarm } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "farmId"
      );
      
      const dataFarm = await Farm.findById({ _id: idFarm });
      console.log(dataFarm)
      if (!dataFarm && !dataPlayer) {
        throw { name: "NOT_FOUND_SPECIFIC" };
      } else {
        res.status(200).json({ message: `Farm found`, data: dataFarm });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateFarm(req, res, next) {
    const { idPlayer, idFarm } = req.params;
    const { farmname } = req.body;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "farmId"
      );
      const dataFarm = await Farm.findOneAndUpdate({ _id:idFarm },{farmname},{new:true});
      res.status(202).json({ message: `Farm name updated`, data: dataFarm });
    } catch (err) {
      next(err);
    }
  }

  static async deleteFarm(req, res, next) {
    const { idPlayer, idFarm } = req.params;
    try {
      const dataPlayer = await Player.findOne({ _id: idPlayer }).populate(
        "farmId"
      );
      if (!dataPlayer) {
        throw { name: "NOT_FOUND" };
      } else {
        const data = await Player.findByIdAndUpdate(
          { _id: idPlayer },
          { $pull: { farmId: idFarm } }
        );
        const result = await Farm.findByIdAndDelete({ _id: idFarm });
        res.status(202).json({ message: `Farm deleted`, data: result });
      }
    } catch (err) {
      next(err);
    }
  }

  static async collectFarm(req, res, next) {
    const { idPlayer, idFarm } = req.params;
    let isValid = false;

    try {
      const data = await Player.findOne({ _id: idPlayer }).populate("farmId");
      if (data) {
        let food = 0;
        const farm_temp = data.farmId;
        for (let i = 0; i < farm_temp.length; i++) {
          if (farm_temp[i]._id.toString() == idFarm) {
            food = farm_temp[i].food;
            isValid = true;
          }
        }
        if (isValid) {
          await Farm.findByIdAndUpdate(
            {
              _id: idFarm,
            },
            { $inc: { food: -food } },
            { new: true }
          );

          const updateDataPlayer = await Player.findByIdAndUpdate(
            { _id: idPlayer },
            { $inc: { food: food } },
            { new: true }
          ).populate("farmId");

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

module.exports = farmController;

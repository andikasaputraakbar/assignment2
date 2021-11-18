const Player = require("../models/Player");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class playerController {
  static async registerPlayer(req, res, next) {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const result = await Player.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Register successful", data: result });
    } catch (err) {
      next(err);
    }
  }

  static async showPlayer(req, res, next) {
    try {
      const result = await Player.find();
      res.status(200).json({ message: "Player show", data: result });
    } catch (err) {
      next(err);
    }
  }

  static async loginPlayer(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await Player.findOne({ email });
      if (!result) {
        throw { name: "UNAUTHORIZED" };
      }
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) {
        throw { name: "UNAUTHORIZED" };
      }
      const token = jwt.sign({ data: result }, "saltacademy", {
        expiresIn: "1h",
      });
      res.status(200).json({
        message: "Login Successful",
        data: result,
        AccessToken: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async playerAttack(req, res, next) {
    const { idPlayer } = req.params;
    const { solPlayer, idEnemy, solEnemy } = req.body;
    try {
      const dataEnemy = await Player.findOne({ _id: idEnemy });
      const dataPlayer = await Player.findOne({ _id: idPlayer });
      if (dataPlayer && dataEnemy) {
        const soldierPlayer = dataPlayer.soldier;
        const soldierEnemy = dataEnemy.soldier;

        if (soldierEnemy > 50) {
          if (soldierPlayer < solPlayer || soldierPlayer === 0) {
            throw { name: "SOLDIER_NOT_ENOUGH" };
          } else if (soldierEnemy < solEnemy || soldierEnemy === 0) {
            throw { name: "ENEMY_SOLDIER_NOT_ENOUGH" };
          } else {
            await Player.findOneAndUpdate(
              { _id: idPlayer },
              { $inc: { soldier: -solPlayer } }
            );
            await Player.findOneAndUpdate(
              { _id: idEnemy },
              { $inc: { soldier: -solEnemy } }
            );

            const arr = [];
            for (let i = 0; i < 3; i++) {
              const fight = solPlayer / (solEnemy + 1);
              arr.push(Math.random() < fight);
            }
            const isSuccess = arr.filter((el) => el).length >= 2 ? true : false;
            if (isSuccess) {
              const goldEnemy = dataEnemy.gold;
              const foodEnemy = dataEnemy.food;

              await Player.findOneAndUpdate(
                { _id: idPlayer },
                {
                  $inc: {
                    medal: 5,
                    gold: Math.floor(goldEnemy / 2),
                    food: Math.floor(foodEnemy / 2),
                  },
                }
              );

              await Player.findOneAndUpdate(
                { _id: idEnemy },
                {
                  $inc: {
                    soldier: 0,
                    gold: Math.floor(goldEnemy / 2),
                    food: Math.floor(foodEnemy / 2),
                  },
                }
              );

              res.status(200).json({ status: "Win" });
            } else {
              const medal = dataPlayer.medal;

              await Player.findOneAndUpdate(
                { _id: idPlayer },
                { medal: Math.floor(medal / 2) }
              );
              await Player.findOneAndUpdate(
                { _id: idEnemy },
                { $inc: { medal: 2 } }
              );
              res.status(200).json({ status: "Lose" });
            }
          }

        } else {
          throw { name: "ENEMY_SOLDIER_NOT_ENOUGH" };
        }
      } else {
        throw { name: "NOT_FOUND" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = playerController;

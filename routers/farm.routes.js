const express = require("express");
const farmRouter = express.Router();
const farmController = require("../controllers/farm.controller");
const auth = require("../middlewares/authJwt");


farmRouter.get("/:idPlayer",auth.authentication, auth.specificPlayer, farmController.showFarm);
farmRouter.post("/:idPlayer",auth.authentication, auth.specificPlayer, farmController.createFarm);
farmRouter.get("/:idPlayer/:idFarm",auth.authentication, auth.specificPlayer, farmController.findFarm);
farmRouter.put("/:idPlayer/:idFarm",auth.authentication, auth.specificPlayer, farmController.updateFarm);
farmRouter.delete("/:idPlayer/:idFarm",auth.authentication, auth.specificPlayer, farmController.deleteFarm);
farmRouter.post("/:idPlayer/:idFarm",auth.authentication, auth.specificPlayer, farmController.collectFarm);

module.exports = farmRouter;

const express = require("express");
const marketRouter = express.Router();
const marketController = require("../controllers/market.controller");
const auth = require("../middlewares/authJwt");

marketRouter.get("/:idPlayer",auth.authentication, auth.specificPlayer, marketController.showMarket);
marketRouter.post("/:idPlayer",auth.authentication, auth.specificPlayer, marketController.createMarket);
marketRouter.get("/:idPlayer/:idMarket",auth.authentication, auth.specificPlayer, marketController.findMarket);
marketRouter.put("/:idPlayer/:idMarket",auth.authentication, auth.specificPlayer, marketController.updateMarket);
marketRouter.delete("/:idPlayer/:idMarket",auth.authentication, auth.specificPlayer, marketController.deleteMarket);
marketRouter.post("/:idPlayer/:idMarket",auth.authentication, auth.specificPlayer, marketController.collectMarket);

module.exports = marketRouter;

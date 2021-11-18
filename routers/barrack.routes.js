const express = require("express");
const barrackRouter = express.Router();
const barrackController = require("../controllers/barrack.controller")
const auth = require("../middlewares/authJwt");

barrackRouter.get("/:idPlayer",auth.authentication,auth.specificPlayer, barrackController.showBarrack);
barrackRouter.post("/:idPlayer",auth.authentication,auth.specificPlayer, barrackController.createBarrack);
barrackRouter.get("/:idPlayer/:idBarrack",auth.authentication, auth.specificPlayer, barrackController.findBarrack);
barrackRouter.put("/:idPlayer/:idBarrack",auth.authentication, auth.specificPlayer, barrackController.updateBarrack);
barrackRouter.delete("/:idPlayer/:idBarrack",auth.authentication, auth.specificPlayer, barrackController.deleteBarrack);
barrackRouter.post("/:idPlayer/:idBarrack",auth.authentication, auth.specificPlayer, barrackController.collectBarrack);

module.exports = barrackRouter;

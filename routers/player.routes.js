const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controllers/player.controller");
const auth = require("../middlewares/authJwt");

playerRouter.get("/", playerController.showPlayer);
playerRouter.post("/register", playerController.registerPlayer);
playerRouter.post("/login", playerController.loginPlayer);
playerRouter.post("/attack/:idPlayer",auth.authentication,auth.specificPlayer,playerController.playerAttack)


module.exports = playerRouter;

import { Router } from "express";
import playerController from "./../controllers/player.controller";
import auth from "./../middlewares/authJwt";

class PlayerRouter {
  playerRouter: Router;
  constructor() {
    this.playerRouter = Router();
    this.routes();
  }
  routes = () => {
      this.playerRouter.get("/a",(req,res)=>{
          res.send("tes")
      })
    this.playerRouter.get("/", playerController.showPlayer);
    this.playerRouter.post("/register", playerController.registerPlayer);
    this.playerRouter.post("/login", playerController.loginPlayer);
    this.playerRouter.post(
      "/attack/:idPlayer",
      auth.authentication,
      auth.specificPlayer,
      playerController.playerAttack
    );
  };
}

export default new PlayerRouter().playerRouter;

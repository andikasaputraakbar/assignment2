import { Router } from "express";
import barrackController from "./../controllers/barrack.controller";
import auth from "./../middlewares/authJwt";

class BarrackRouter {
  barrackRouter: Router;
  constructor() {
    this.barrackRouter = Router();
    this.routes();
  }
  routes = () => {
    this.barrackRouter.get(
      "/:idPlayer",
      auth.authentication,
      auth.specificPlayer,
      barrackController.showBarrack
    );
    this.barrackRouter.post(
      "/:idPlayer",
      auth.authentication,
      auth.specificPlayer,
      barrackController.createBarrack
    );
    this.barrackRouter.get(
      "/:idPlayer/:idBarrack",
      auth.authentication,
      auth.specificPlayer,
      barrackController.findBarrack
    );
    this.barrackRouter.put(
      "/:idPlayer/:idBarrack",
      auth.authentication,
      auth.specificPlayer,
      barrackController.updateBarrack
    );
    this.barrackRouter.delete(
      "/:idPlayer/:idBarrack",
      auth.authentication,
      auth.specificPlayer,
      barrackController.deleteBarrack
    );
    this.barrackRouter.post(
      "/:idPlayer/:idBarrack",
      auth.authentication,
      auth.specificPlayer,
      barrackController.collectBarrack
    );
  };
}

export default new BarrackRouter().barrackRouter;

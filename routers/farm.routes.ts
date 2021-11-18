import { Router } from "express";
import farmController from "../controllers/farm.controller";
import auth from "../middlewares/authJwt";

class FarmRouter {
  farmRouter: Router;
  constructor() {
    this.farmRouter = Router();
    this.routes();
  }
  routes = () => {
    this.farmRouter.get(
      "/:idPlayer",
      auth.authentication,
      auth.specificPlayer,
      farmController.showFarm
    );
    this.farmRouter.post(
      "/:idPlayer",
      auth.authentication,
      auth.specificPlayer,
      farmController.createFarm
    );
    this.farmRouter.get(
      "/:idPlayer/:idFarm",
      auth.authentication,
      auth.specificPlayer,
      farmController.findFarm
    );
    this.farmRouter.put(
      "/:idPlayer/:idFarm",
      auth.authentication,
      auth.specificPlayer,
      farmController.updateFarm
    );
    this.farmRouter.delete(
      "/:idPlayer/:idFarm",
      auth.authentication,
      auth.specificPlayer,
      farmController.deleteFarm
    );
    this.farmRouter.post(
      "/:idPlayer/:idFarm",
      auth.authentication,
      auth.specificPlayer,
      farmController.collectFarm
    );
  };
}

export default new FarmRouter().farmRouter;

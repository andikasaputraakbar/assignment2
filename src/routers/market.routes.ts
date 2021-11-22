import { Router } from "express";
import marketController from "./../controllers/market.controller";
import auth from "./../middlewares/authJwt";

class MarketRouter {
  marketRouter: Router;
  constructor() {
    this.marketRouter = Router();
    this.routes();
  }
  routes = () => {
    this.marketRouter.get(
      "/:idPlayer",
      auth.authentication,
      auth.specificPlayer,
      marketController.showMarket
    );
    this.marketRouter.post(
      "/:idPlayer",
      auth.authentication,
      auth.specificPlayer,
      marketController.createMarket
    );
    this.marketRouter.get(
      "/:idPlayer/:idMarket",
      auth.authentication,
      auth.specificPlayer,
      marketController.findMarket
    );
    this.marketRouter.put(
      "/:idPlayer/:idMarket",
      auth.authentication,
      auth.specificPlayer,
      marketController.updateMarket
    );
    this.marketRouter.delete(
      "/:idPlayer/:idMarket",
      auth.authentication,
      auth.specificPlayer,
      marketController.deleteMarket
    );
    this.marketRouter.post(
      "/:idPlayer/:idMarket",
      auth.authentication,
      auth.specificPlayer,
      marketController.collectMarket
    );
  };
}

export default new MarketRouter().marketRouter;

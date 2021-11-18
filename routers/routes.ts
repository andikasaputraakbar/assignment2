import express, { Router } from "express";
import playerRouter from "./player.routes";
import barrackRouter from "./barrack.routes";
import farmRouter from "./farm.routes";
import marketRouter from "./market.routes";

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.get("/",(req,res)=> {
        res.send("ini router");
    })
    this.router.use("/player", playerRouter);
    this.router.use("/barrack", barrackRouter);
    this.router.use("/farm", farmRouter);
    this.router.use("/market", marketRouter);
  };
}

export default new Routes().router;

import express, { Application } from "express";
import router from "./src/routers/routes";
import errorHandler from "./src/middlewares/errorHandler";
import ConnectDb from "./src/database/connectionDb";

class App {
  public app: Application;
  public port: Number;
  constructor() {
    this.app = express();
    this.port = 8080;
    this.router();
  }

  router = () => {
    ConnectDb.connectDb();
    ConnectDb.CronJobDb();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.get("/test/:idPlayer", (req, res) => {
      const { idPlayer } = req.params;
      res.json({ pesan: "Welcome to my App", idPlayer });
    });

    this.app.use("/api", router);
    this.app.use(errorHandler.errorHandler);

    this.app.listen(this.port, () => {
      console.log(`app running on http://localhost:${this.port}`);
    });
  };
}

export default new App().app;

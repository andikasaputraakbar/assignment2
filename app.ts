import express, { Application } from "express";
import router from "./routers/routes";
import errorHandler from "./middlewares/errorHandler";
import ConnectDb from "./configs/connectionDb";

class App {
  public app: Application;
  public port: Number;
  constructor() {
    this.app = express();
    this.port = 8080;
  }

  router = () => {
    this.app.use(ConnectDb.connectDb);
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

new App().app;

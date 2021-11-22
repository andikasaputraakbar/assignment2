import mongoose from "mongoose";
import Barrack from "../models/Barrack";
import Farm from "../models/Farm";
import Market from "../models/Market";
import Cronjob from "cron";

class ConnectDb{
  static connectDb = async () => {
    try {
      const dbPathUri = "mongodb://localhost:27017/";
      const dbName = "clashOfVillageDb";
      await mongoose.connect(`${dbPathUri}${dbName}`);
      console.log("DB Connected");
      
    } catch (err) {
      console.log(err);  
    }
  };

  static CronJobDb = async () => {
    mongoose.connection.once("open", async () => {
      var CronJob = Cronjob.CronJob;
      var job = new CronJob(
        " * * * * * ",
        async function () {
          await Barrack.updateMany(
            { soldier: { $lt: 10 } },
            { $inc: { soldier: 1 } }
          );
          await Farm.updateMany({ food: { $lt: 20 } }, { $inc: { food: 1 } });
          await Market.updateMany({ gold: { $lt: 20 } }, { $inc: { gold: 1 } });
        },
        null,
        true,
        "America/Los_Angeles"
      );
      job.start();
    });  
  };
}

export default ConnectDb ;

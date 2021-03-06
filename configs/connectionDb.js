const mongoose = require("mongoose");
const Barrack = require("../models/Barrack");
const Farm = require("../models/Farm");
const Market = require("../models/Market");
const Player = require("../models/Player");

const connectDB = async () => {
  try {
    const dbPathUri = "mongodb://localhost:27017/";
    const dbName = "clashOfVillageDb";
    await mongoose.connect(`${dbPathUri}${dbName}`);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.once("open", async () => {
  var CronJob = require("cron").CronJob;
  var job = new CronJob(
    " * * * * *",
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



module.exports = connectDB;

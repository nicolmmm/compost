const db = require("../config/connection");
const { User, Station } = require("../models");
const stationSeed = require("./stationSeed.json");
const userSeed = require("./userSeed.json");

db.once("open", async () => {
  await User.deleteMany({});
  await Station.deleteMany({});
  await User.create(userSeed);
  await Station.create(stationSeed);
  console.log("all done!");
  process.exit(0);
});

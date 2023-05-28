const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://SentinelSky:SentinelSky%404@sentinelskycluster.8sliicl.mongodb.net/?retryWrites=true&w=majority"
    );


    console.log(`Mongo db connected!!!`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

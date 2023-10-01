const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectMongoDB() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectMongoDB };

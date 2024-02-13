const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

module.exports = () => {
  const connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Business",
    });
  };

  connect();
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB error", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("retry connect");
    connect();
  });
  require("./barcode");
};

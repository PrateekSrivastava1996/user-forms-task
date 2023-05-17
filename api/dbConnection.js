var mongoose = require("mongoose");
var CONFIG = require("./config.json");

mongoose.connect(CONFIG.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("open", () => {
  console.log("Db Connected!");
});

db.on("error", console.error.bind(console, "Db connection error:"));
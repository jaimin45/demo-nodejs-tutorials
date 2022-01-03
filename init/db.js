require("dotenv").config();
const mongoose = require("mongoose");

// mongoose connection
const promise = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

module.exports = { promise, mongoose };

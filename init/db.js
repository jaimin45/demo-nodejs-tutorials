const mongoose = require("mongoose");

// mongoose connection
const promise = mongoose.connect("mongodb://localhost:27017/tutorials", {
  useNewUrlParser: true,
});

module.exports = { promise, mongoose };

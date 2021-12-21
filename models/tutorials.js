const mongoose = require("mongoose");

// Schema
const tutorialSchema = new mongoose.Schema(
  {
    published: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutorial1", tutorialSchema);

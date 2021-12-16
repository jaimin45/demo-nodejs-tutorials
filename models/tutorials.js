const mongoose = require("mongoose");

// Schema
const tutorialSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Tutorial", tutorialSchema);

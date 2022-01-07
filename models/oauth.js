const mongoose = require("mongoose");

const oauthSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("oauth", oauthSchema);

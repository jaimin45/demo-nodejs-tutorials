const mongoose = require("mongoose");

// Schema
const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      references: {
        model: "user",
        key: "email",
      },
    },
    otp: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
OtpSchema.methods.isExpired = function isExpired() {
  const currentTime = new Date().getTime();
  const timeDifference = this.expiresIn - currentTime < 0;
  return timeDifference;
};
module.exports = mongoose.model("Otp", OtpSchema);

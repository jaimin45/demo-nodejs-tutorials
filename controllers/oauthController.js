require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Otp = require("../models/otp");
const {
  postOauthSchema,
  patchUserPasswordSchema,
} = require("../validations/oauth.validation");
const { OtpSchema, patchOtpSchema } = require("../validations/otp.validations");
const logger = require("../config/winston");
const { transporter } = require("../init/userMailer");

const loginUser = async (req, res) => {
  try {
    const { error, value } = postOauthSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const user = await User.findOne({
      email: value.email,
    });
    value.password = await user.userPasswordCompare(value.password);

    if (!value.password) {
      res.status(401).send("User unauthorized!!!");
    } else {
      const token = await user.generateAuthToken();
      res.status(200).send({ message: token });
    }
  } catch (error) {
    logger.error("Could not login: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  return null;
};

const changePassword = async (req, res) => {
  try {
    const { error, value } = patchUserPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const tokenVerify = await User.findOne(req.body);
    const user = await tokenVerify.verifyUserToken(req);
    value.newPassword = await user.userPassword(value.newPassword, 10);
    const comparePassword = await user.userPasswordCompare(
      value.currentPassword
    );
    if (!comparePassword) {
      res.status(400).send({ message: "Invalid Password details" });
    }
    user.password = value.newPassword;
    await user.save();
    res.status(200).send();
  } catch (error) {
    if (error) {
      res.status(400).send({ message: "Couldn't connect with database" });
    } else {
      logger.error("Could not update password: ", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  return null;
};

const otpSendEmail = async (req, res) => {
  try {
    const { error, value } = OtpSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const userOtp = parseInt(Math.random() * 1000000, 10).toString(36);
    const expireOtp = new Date().getTime() + 600 * 1000;
    const user = await User.findOne({ email: value.email });
    if (user) {
      const otp = new Otp({
        email: value.email,
        otp: userOtp,
        expiresIn: expireOtp,
      });

      const mailOptions = {
        from: process.env.USERMAIL,
        to: value.email,
        subject: "forget password",
        text: `Dear user <br> Your one time security code to reset the password is:${userOtp}`,
      };

      await otp.save();
      await transporter.sendMail(mailOptions);
      res.status(201).send({ message: "Otp sent successfully" });
    } else {
      res.status(400).send({ message: "Invalid email" });
    }
  } catch (error) {
    logger.error("Could not send otp: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  return null;
};

const forgetPassword = async (req, res) => {
  try {
    const { error, value } = patchOtpSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const userOtp = await Otp.findOne({ otp: value.token });
    const user = await User.findOne({ email: userOtp.email });
    value.newPassword = await bcrypt.hash(value.newPassword, 10);
    if (userOtp.isExpired()) {
      res.status(404).send({ message: "Otp expired" });
    } else {
      user.password = value.newPassword;
      await user.save();
      res.status(204).send({ message: "User password updated" });
    }
  } catch (error) {
    logger.error("Could not send otp: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  return null;
};

module.exports = {
  loginUser,
  changePassword,
  otpSendEmail,
  forgetPassword,
};

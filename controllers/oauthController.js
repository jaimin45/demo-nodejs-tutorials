require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Oauth = require("../models/oauth");
const {
  postOauthSchema,
  patchUserPasswordSchema,
} = require("../validations/oauth.validation");
const logger = require("../config/winston");

const loginUser = async (req, res) => {
  try {
    const { error, value } = postOauthSchema.validate(req.body);
    if (error) {
      return res.status(401).send({ message: error.message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (value.password === user.password) {
      const token = jwt.sign({ _id: req.params.id }, process.env.TOKEN_KEY, {
        expiresIn: "12h",
      });
      const oauth = new Oauth({ token });
      await oauth.save();
      res.status(200).send({ message: token });
    }
  } catch (error) {
    if (error) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      logger.error("Could not create user: ", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  return null;
};

const changePassword = async (req, res) => {
  try {
    const { error, value } = patchUserPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const userPassword = await User.findOne(req.body);
    const authHeader = req.headers.authorization;
    jwt.verify(authHeader, process.env.TOKEN_KEY);

    if (userPassword.password !== value.currentPassword) {
      res.status(400).send({ message: "Invalid Password details" });
    } else {
      userPassword.password = value.newPassword;
      await userPassword.save();
      res.status(200).send();
    }
  } catch (error) {
    if (error) {
      res.status(400).send({ message: "Invalid token" });
    } else {
      logger.error("Could not update tutorial: ", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  return null;
};

module.exports = {
  loginUser,
  changePassword,
};

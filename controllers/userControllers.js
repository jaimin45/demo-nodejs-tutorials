const { CastError } = require("mongoose");
const User = require("../models/user");
const {
  postUserSchema,
  patchUserSchema,
} = require("../validations/user.validations");
const logger = require("../config/winston");

// user create
const createUser = async (req, res) => {
  try {
    const { error, value } = postUserSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const user = new User(value);
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      res.status(409).send({ message: " Email already exists " });
    } else {
      await user.save();
      res.status(201).send(user);
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ message: "Invalid User Details" });
    } else {
      logger.error("Could not create user: ", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  return null;
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { error, value } = patchUserSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      res.status(409).send({ message: " Email already exists " });
    } else {
      await User.findByIdAndUpdate({ _id: req.params.id }, value);
      res.status(204).send({ message: "User updated" });
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(404).send({ message: "User not found" });
    } else {
      logger.error("Could not update User: ", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  return null;
};

module.exports = {
  createUser,
  updateUser,
};

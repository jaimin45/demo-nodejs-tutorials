const joi = require("joi");

const postUserSchema = joi.object({
  firstName: joi.string().min(3).max(20).required(),
  lastName: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
});

const patchUserSchema = joi.object({
  firstName: joi.string().min(3).max(20).required(),
  lastName: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
});

module.exports = {
  postUserSchema,
  patchUserSchema,
};

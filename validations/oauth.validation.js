const joi = require("joi");

const postOauthSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
});

const patchUserPasswordSchema = joi.object({
  currentPassword: joi.string().min(8).max(20),
  newPassword: joi.string().min(8).max(20),
});

module.exports = {
  postOauthSchema,
  patchUserPasswordSchema,
};

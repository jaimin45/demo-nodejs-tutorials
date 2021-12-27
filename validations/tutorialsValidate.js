const joi = require("joi");

const schema = joi.object({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().min(1).max(5000).required(),
  published: joi.boolean().required(),
});

module.exports = {
  schema,
};

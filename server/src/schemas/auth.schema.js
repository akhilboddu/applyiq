const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Please enter a valid email address" }),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/) // at least one uppercase
    .pattern(/[0-9]/) // at least one number
    .required()
    .messages({ "string.min": "Password must be at least 8 characters" }),
  name: Joi.string().max(50).trim(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  // no rules here on purpose — we check the password against the hash,
  // not against a policy. Old accounts may predate today's policy.
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };

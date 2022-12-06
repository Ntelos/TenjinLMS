const Joi = require('joi');

const loginValidator = (schema) => (payload) => 
    schema.validate(payload, { abortEarly: false });

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required()
});

exports.validateLogin = loginValidator(loginSchema);
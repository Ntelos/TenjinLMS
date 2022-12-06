const Joi = require('joi');

const studentsValidator = (schema) => (payload) => 
    schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$')).required(),
    name: Joi.string().max(50).required(),
    surname: Joi.string().max(50).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$'))
});

exports.validateRegistration = studentsValidator(registerSchema);
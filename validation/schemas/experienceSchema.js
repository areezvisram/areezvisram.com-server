const joi = require('joi');

const experienceSchema = joi.object({
    company: joi.string().required(),    
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    position: joi.string().required(),
    description: joi.array().items(joi.string()).required(),
    technical_environment: joi.array().items(joi.string()).required(),
    index: joi.number().integer().required().strict(),
});

module.exports = {
    experienceSchema
}

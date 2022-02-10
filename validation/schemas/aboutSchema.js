// About request body schema
const joi = require('joi');

const aboutSchema = joi.object({
    name: joi.string().required(),    
    partition: joi.string().valid('language', 'skill').required(),
    index: joi.number().integer().required().strict(),
});

module.exports = {
    aboutSchema
}

// About request body schema
const joi = require('joi');

const aboutListSchema = joi.object({
    icon: joi.string().required(),
    sentence: joi.string().required()    
});

module.exports = {
    aboutListSchema
}

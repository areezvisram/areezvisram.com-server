// About request body schema
const joi = require('joi');

const contactMeSchema = joi.object({
    name: joi.string().required(),
    email_address: joi.string().required(),
    message: joi.string().required(),
});

module.exports = {
    contactMeSchema
}

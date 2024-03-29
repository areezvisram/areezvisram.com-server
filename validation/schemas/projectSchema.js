// Project request body schema
const joi = require('joi');

const projectSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    languages: joi.array().items(joi.string()).required(),
    github: joi.string().required(),
    external: joi.string().optional(),
    partition: joi.string().required().valid('non-featured', 'featured'),
    index: joi.number().integer().required().strict(),
    image_url: joi.string().when('partition', { is: 'featured', otherwise: joi.forbidden() })
});

module.exports = {
    projectSchema
}

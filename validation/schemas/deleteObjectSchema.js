// Delete object request body schema
const joi = require('joi');

const deleteObjectSchema = joi.object({
    docId: joi.string().required(),    
    rev: joi.string().required(),
});

module.exports = {
    deleteObjectSchema
}

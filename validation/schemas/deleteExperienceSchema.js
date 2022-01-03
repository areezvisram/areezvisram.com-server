const joi = require('joi');

const deleteExperienceSchema = joi.object({
    docId: joi.string().required(),    
    rev: joi.string().required(),
});

module.exports = {
    deleteExperienceSchema
}

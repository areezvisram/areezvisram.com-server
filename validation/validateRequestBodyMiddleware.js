const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const joi = require('joi');

const validateRequestBodyMiddleware = (schema) => {
    return async(req, res, next) =>
    {
        try {
            console.log("validating");
            const validatedBody = await schema.validateAsync(req.body);
            req.body = validatedBody;
            next();
        }
        catch (err) {
            if(err.isJoi) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    error: getReasonPhrase(StatusCodes.BAD_REQUEST),
                    message: err.message
                });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            } 
        }
    }
}

module.exports = {
    validateRequestBodyMiddleware
}
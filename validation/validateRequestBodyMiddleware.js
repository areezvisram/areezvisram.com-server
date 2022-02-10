const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const joi = require('joi');

// Middleware to validate request body
// Validate body with passed schema, if valid, pass the request to endpoint, if not valid, return 400 error
const validateRequestBodyMiddleware = (schema) => {
    return async(req, res, next) =>
    {
        try {            
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
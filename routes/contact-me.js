const express = require('express');
const router = express.Router();
const { routes } = require('../constants/routes');
const { sendEmail } = require('../operations/contact-me');
const { contactMeSchema } = require('../validation/schemas/contactMeSchema');
const { validateRequestBodyMiddleware } = require('../validation/validateRequestBodyMiddleware');


router.post(routes.CONTACT_ME_POST_ENTRY, validateRequestBodyMiddleware(contactMeSchema), async (req, res, next) => {
    const { name, email_address, message } = req.body;
    await sendEmail({ name, email_address, message }).then((response) => {
        res.send(response);
    })
})

module.exports = router;

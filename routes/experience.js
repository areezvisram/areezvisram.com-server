const express = require('express');
const { getExperience, postExperience, deleteExperience } = require('../operations/experience');
const router = express.Router();
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');
const { validateRequestBodyMiddleware } = require('../validation/validateRequestBodyMiddleware');
const { experienceSchema } = require('../validation/schemas/experienceSchema');
const { deleteObjectSchema } = require('../validation/schemas/deleteObjectSchema');

router.get(routes.EXPERIENCE_GET, (async (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;    
    const cachedData = cache.get(key);
    if(cachedData) {
        console.log('calling experience from cache');
        res.send({ experience: cachedData });
    } else {
        console.log('calling experience from db');
        await getExperience().then((response) => {        
            cache.set(key, response, 0);
            res.send({ experience: response });
        });
    }    
}));

router.post(routes.EXPERIENCE_POST, validateRequestBodyMiddleware(experienceSchema), async (req, res, next) => {                
    await postExperience(req.body).then((response) => {
        res.send(response);
    })        
});

router.delete(routes.EXPERIENCE_DELETE, validateRequestBodyMiddleware(deleteObjectSchema), async(req, res, next) => {
    const { docId, rev } = req.body;
    await deleteExperience(docId, rev).then((response) => {
        res.send(response);
    })
})

module.exports = router;

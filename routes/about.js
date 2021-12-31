const express = require('express');
const { getLanguages, getSkills, postAbout } = require('../operations/about');
const router = express.Router();
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');
const { validateRequestBodyMiddleware } = require('../validation/validateRequestBodyMiddleware');
const { aboutSchema } = require('../validation/schemas/aboutSchema');

router.get(routes.ABOUT_GET_LANGUAGES, (async (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;    
    const cachedData = cache.get(key);
    if(cachedData) {
        console.log('calling languages from cache');
        res.send(cachedData);
    } else {
        console.log('calling languages from db');
        await getLanguages().then((response) => {        
            cache.set(key, response, 0);
            res.send(response);
        });
    }    
}));

router.get(routes.ABOUT_GET_SKILLS, (async (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;    
    const cachedData = cache.get(key);
    if(cachedData) {
        console.log('calling skills from cache');
        res.send(cachedData);
    } else {
        console.log('calling skills from db');
        await getSkills().then((response) => {        
            res.send(response);
        })
    }
}));

router.post(routes.ABOUT_POST, validateRequestBodyMiddleware(aboutSchema), (req, res, next) => {            
    await postAbout(req.body).then((response) => {
        res.send(response);
    })        
})

module.exports = router;

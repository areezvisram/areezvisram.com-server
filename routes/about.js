const express = require('express');
const { getLanguages, getSkills, getList, postAboutSkillLanguage, postAboutList } = require('../operations/about');
const router = express.Router();
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');
const { validateRequestBodyMiddleware } = require('../validation/validateRequestBodyMiddleware');
const { aboutSkillLanguageSchema } = require('../validation/schemas/aboutSkillLanguageSchema');
const { deleteObjectSchema } = require('../validation/schemas/deleteObjectSchema');
const { aboutListSchema } = require('../validation/schemas/aboutListSchema');


// Get languages route
// First check cache, if empty, get from database, if not, return from cache
router.get(routes.ABOUT_GET_LANGUAGES, (async (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedData = cache.get(key);
    if (cachedData) {
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

// Get skills route
// First check cache, if empty, get from database, if not, return from cache
router.get(routes.ABOUT_GET_SKILLS, (async (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedData = cache.get(key);
    if (cachedData) {
        console.log('calling skills from cache');
        res.send(cachedData);
    } else {
        console.log('calling skills from db');
        await getSkills().then((response) => {
            cache.set(key, response, 0);
            res.send(response);
        })
    }
}));

router.get(routes.ABOUT_GET_LIST, (async (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedData = cache.get(key);
    if (cachedData) {
        console.log('calling about list from cache');
        res.send(cachedData);
    } else {
        console.log('calling about list from db');
        await getList().then((response) => {
            cache.set(key, response, 0)
            res.send(response);
        })
    }
}))

// Post about data route with request body validation
router.post(routes.ABOUT_POST_SKILL_LANGUAGE, validateRequestBodyMiddleware(aboutSkillLanguageSchema), async (req, res, next) => {
    await postAboutSkillLanguage(req.body).then((response) => {
        res.send(response);
    })
})

router.post(routes.ABOUT_POST_LIST, validateRequestBodyMiddleware(aboutListSchema), async (req, res, next) => {
    await postAboutList(req.body).then((response) => {
        res.send(response);
    })
})

module.exports = router;

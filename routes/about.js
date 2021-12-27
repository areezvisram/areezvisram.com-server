var express = require('express');
const { getLanguages, getSkills } = require('../operations/about');
var router = express.Router();

router.get('/getLanguages', (async (req, res, next) => {
    await getLanguages().then((response) => {        
        res.send(response);
    })
}));

router.get('/getSkills', (async (req, res, next) => {
    await getSkills().then((response) => {        
        res.send(response);
    })
}));

module.exports = router;

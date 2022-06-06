const express = require('express');
const { getProjects, postProject, deleteProject } = require('../operations/projects');
const router = express.Router();
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');
const { deleteObjectSchema } = require('../validation/schemas/deleteObjectSchema');
const { validateRequestBodyMiddleware } = require('../validation/validateRequestBodyMiddleware');
const { projectSchema } = require('../validation/schemas/projectSchema');
const { cloudinaryUpload } = require('../helpers/cloudinary');

// Get projects route
// First check cache, if empty, get from database, if not, return from cache
router.get(routes.PROJECTS_GET, (async (req, res, next) => {
    const partition = req.headers.partition;
    const key = '__express__' + partition + req.originalUrl || req.url;
    const cachedData = cache.get(key);
    if (cachedData) {
        console.log(`calling ${partition} projects from cache`);
        res.send({ projects: cachedData });
    } else {
        console.log(`calling ${partition} projects from db`);
        await getProjects(partition).then((response) => {
            cache.set(key, response, 0);
            res.send({ projects: response });
        });
    }
}));

// Post project data route with request body validation
router.post(routes.PROJECTS_POST, validateRequestBodyMiddleware(projectSchema), async (req, res, next) => {
    await postProject(req.body).then((response) => {
        res.send(response);
    });
});

router.post('/cloudinary', async(req, res, next) => {
    await cloudinaryUpload(req.body.imagePath).then((response) => {
        res.send(response)
    })
})


// Delete project data route with request body validation
router.delete(routes.EXPERIENCE_DELETE, validateRequestBodyMiddleware(deleteObjectSchema), async (req, res, next) => {
    const { docId, rev } = req.body;
    await deleteProject(docId, rev).then((response) => {
        res.send(response);
    })
})

module.exports = router;

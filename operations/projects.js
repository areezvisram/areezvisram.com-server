const { projectsDatabase } = require("../constants/projects");
const { queryAllDocsPartitioned, postDocumentPartitioned, deleteDocument } = require("../helpers/cloudant");
const { mapProjects } = require("../mappers/projects");
const { initializeCloudant } = require("../services/cloudant");
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');
const { cloudinaryUpload } = require('../helpers/cloudinary');

// Initialize Cloudant service
const service = initializeCloudant();

// Get projects from database
const getProjects = async (partition) => {
    let rows;
    await queryAllDocsPartitioned(service, projectsDatabase, partition).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapProjects(rows);

    return mappedData;
}

// Post projects to database
const postProject = async (document) => {

    const partition = document.partition;

    cache.del(`__express__${partition}${routes.PROJECTS_ROUTE}${routes.PROJECTS_GET}`);

    const imagePath = document.imagePath;
    delete document.imagePath;

    let response = { "test": "test"};
    await cloudinaryUpload(imagePath).then((res) => {
        const image_url = res.url;
        document = Object.assign({ "image_url": image_url }, document);        
    }).then(async () => {
        await postDocumentPartitioned(service, document, projectsDatabase).then((res) => {
            response = res.result;
        })
    })

    
    // await postDocumentPartitioned(service, document, projectsDatabase).then((res) => {
    //     response = res.result;
    // });

    return response;
};

// Delete project from database
const deleteProject = async (docId, rev) => {
    cache.del(`__express__${routes.PROJECTS_ROUTE}${routes.PROJECTS_GET}`);

    let response;
    await deleteDocument(service, docId, rev, projectsDatabase).then((res) => {
        response = res.result;
    });

    return response;
}

module.exports = {
    getProjects,
    postProject,
    deleteProject
}
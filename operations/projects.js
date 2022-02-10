const { projectsDatabase } = require("../constants/projects");
const { queryAllDocsPartitioned, postDocumentPartitioned, deleteDocument } = require("../helpers/cloudant");
const { mapProjects } = require("../mappers/projects");
const { initializeCloudant } = require("../services/cloudant");
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');

const service = initializeCloudant();

const getProjects = async (partition) => {    
    let rows;
    await queryAllDocsPartitioned(service, projectsDatabase, partition).then((res) => {
        rows = res.result.rows;
    });
    
    const mappedData = mapProjects(rows);

    return mappedData;
}

const postProject = async(document) => {

    const partition = document.partition;

    cache.del(`__express__${partition}${routes.PROJECTS_ROUTE}${routes.PROJECTS_GET}`);

    let response;
    await postDocumentPartitioned(service, document, projectsDatabase).then((res) => {
        response = res.result;
    });

    return response;
};

const deleteProject = async(docId, rev) => {
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
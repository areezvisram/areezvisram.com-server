const { experienceDatabase } = require("../constants/experience");
const { queryAllDocs, postDocument, deleteDocument } = require("../helpers/cloudant");
const { mapExperienceData } = require('../mappers/experience');
const { initializeCloudant } = require("../services/cloudant");
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');

// Initialize Cloudant service
const service = initializeCloudant();

// Get experience from database
const getExperience = async () => {
    let rows;
    await queryAllDocs(service, experienceDatabase).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapExperienceData(rows);

    return mappedData;
}

// Post experience data to database
const postExperience = async (document) => {

    cache.del(`__express__${routes.EXPERIENCE_ROUTE}${routes.EXPERIENCE_GET}`);

    let response;
    await postDocument(service, document, experienceDatabase).then((res) => {
        response = res.result;
    });

    return response;
};

// Delete experience data from database
const deleteExperience = async (docId, rev) => {
    cache.del(`__express__${routes.EXPERIENCE_ROUTE}${routes.EXPERIENCE_GET}`);

    let response;
    await deleteDocument(service, docId, rev, experienceDatabase).then((res) => {
        response = res.result;
    });

    return response;
}

module.exports = {
    getExperience,
    postExperience,
    deleteExperience
}
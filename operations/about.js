const { aboutDatabase, language, skill } = require("../constants/about");
const { queryAllDocsPartitioned, postDocumentPartitioned } = require("../helpers/cloudant");
const { mapAboutData } = require("../mappers/about");
const { initializeCloudant } = require("../services/cloudant");
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');

const service = initializeCloudant();

const getLanguages = async () => {    
    let rows;
    await queryAllDocsPartitioned(service, aboutDatabase, language).then((res) => {
        rows = res.result.rows;
    });
    
    const mappedData = mapAboutData(rows, language);

    return mappedData;
}

const getSkills = async () => {
    let rows;
    await queryAllDocsPartitioned(service, aboutDatabase, skill).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapAboutData(rows, skill);

    return mappedData;
}

const postAbout = async(document) => {
    const type = document.partition;
    type === "language" ? cache.del(`__express__${routes.ABOUT_ROUTE}${routes.ABOUT_GET_LANGUAGES}`) : cache.del(`__express__${routes.ABOUT_ROUTE}${routes.ABOUT_GET_SKILLS}`);    
    
    let response;
    await postDocumentPartitioned(service, document, aboutDatabase).then((res) => {
        response = res.result;
    });

    return response;
}

module.exports = {
    getLanguages,
    getSkills,
    postAbout
}
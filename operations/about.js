const { aboutDatabase, aboutListDatabase, language, skill } = require("../constants/about");
const { queryAllDocsPartitioned, postDocumentPartitioned, queryAllDocs, postDocument } = require("../helpers/cloudant");
const { mapAboutSkillLanguageData, mapAboutListData } = require("../mappers/about");
const { initializeCloudant } = require("../services/cloudant");
const { cache } = require('../helpers/cache');
const { routes } = require('../constants/routes');

// Initialize the cloudant service
const service = initializeCloudant();

// Get languages from database
const getLanguages = async () => {
    let rows;
    await queryAllDocsPartitioned(service, aboutDatabase, language).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapAboutSkillLanguageData(rows, language);

    return mappedData;
}

// Get skills from database
const getSkills = async () => {
    let rows;
    await queryAllDocsPartitioned(service, aboutDatabase, skill).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapAboutSkillLanguageData(rows, skill);

    return mappedData;
}

const getList = async() => {
    let rows;
    await queryAllDocs(service, aboutListDatabase).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapAboutListData(rows);

    return mappedData;
}

// Post about data to database
const postAboutSkillLanguage = async (document) => {
    const type = document.partition;
    type === "language" ? cache.del(`__express__${routes.ABOUT_ROUTE}${routes.ABOUT_GET_LANGUAGES}`) : cache.del(`__express__${routes.ABOUT_ROUTE}${routes.ABOUT_GET_SKILLS}`);

    let response;
    await postDocumentPartitioned(service, document, aboutDatabase).then((res) => {
        response = res.result;
    });

    return response;
}

const postAboutList = async(document) => {
    let response;
    await postDocument(service, document, aboutListDatabase).then((res) => {
        response = res.result;
    });

    return response;
}

module.exports = {
    getLanguages,
    getSkills,
    getList,
    postAboutSkillLanguage,
    postAboutList
}
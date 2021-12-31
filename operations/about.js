const { aboutDatabase, language, skill } = require("../constants/about");
const { queryAllDocs, postDocument } = require("../helpers/cloudant");
const { mapAboutData } = require("../mappers/about");
const { initializeCloudant } = require("../services/cloudant");

const service = initializeCloudant();

const getLanguages = async () => {    
    let rows;
    await queryAllDocs(service, aboutDatabase, language).then((res) => {
        rows = res.result.rows;
    });
    
    const mappedData = mapAboutData(rows, language);

    return mappedData;
}

const getSkills = async () => {
    let rows;
    await queryAllDocs(service, aboutDatabase, skill).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapAboutData(rows, skill);

    return mappedData;
}

const postAbout = async(document) => {
    let response;
    await postDocument(service, document, aboutDatabase).then((res) => {
        response = res.result;
    });

    return response;
}

module.exports = {
    getLanguages,
    getSkills,
    postAbout
}
const { aboutDatabase, language, skill } = require("../constants/about");
const { queryAllDocs } = require("../helpers/cloudant");
const { mapAboutData } = require("../mappers/about");
const { initializeCloudant } = require("../services/cloudant");

const service = initializeCloudant();

const getLanguages = async () => {    
    let rows;
    await queryAllDocs(service, aboutDatabase, language).then((res) => {
        rows = res.result.rows;
    });
    
    const mappedData = mapAboutData(rows);

    return mappedData;
}

const getSkills = async () => {
    let rows;
    await queryAllDocs(service, aboutDatabase, skill).then((res) => {
        rows = res.result.rows;
    });

    const mappedData = mapAboutData(rows);

    return mappedData;
}

module.exports = {
    getLanguages,
    getSkills
}
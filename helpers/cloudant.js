const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { v4: uuid } = require('uuid');
const { cache } = require('./cache');
const { routes } = require('../constants/routes');

const queryAllDocs = (service, dbName, partitionName) => {
    return service.postPartitionAllDocs({
        db: dbName,
        partitionKey: partitionName,
        includeDocs: true
    })
}

const postDocument = (service, document, dbName) => {
    const type = document.partition;
    const aboutDoc = CloudantV1.Document = {
        '_id': `${type}:${uuid()}`,
        ...document
    };        

    type === "language" ? cache.del(`__express__${routes.ABOUT_ROUTE}${routes.ABOUT_GET_LANGUAGES}`) : cache.del(`__express__${routes.ABOUT_ROUTE}${routes.ABOUT_GET_SKILLS}`);    
    
    return service.postDocument({
        db: dbName,
        document: aboutDoc
    })
}

module.exports = {
    queryAllDocs,
    postDocument
}
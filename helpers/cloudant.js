const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { v4: uuid } = require('uuid');

const queryAllDocsPartitioned = (service, dbName, partitionName) => {
    return service.postPartitionAllDocs({
        db: dbName,
        partitionKey: partitionName,
        includeDocs: true
    });
};

const queryAllDocs = (service, dbName) => {
    return service.postAllDocs({
        db: dbName,        
        includeDocs: true
    });
};

const postDocument = (service, document, dbName) => {
    const doc = CloudantV1.Document = {
        '_id': `${uuid()}`,
        ...document
    };

    return service.postDocument({
        db: dbName,
        document: doc
    });
};

const postDocumentPartitioned = (service, document, dbName) => {    
    const doc = CloudantV1.Document = {
        '_id': `${document.partition}:${uuid()}`,
        ...document
    };
    
    return service.postDocument({
        db: dbName,
        document: doc
    });
};

const deleteDocument = (service, docId, rev, dbName) => {
    return service.deleteDocument({
        db: dbName,
        docId: docId,
        rev: rev
    });
}

module.exports = {
    queryAllDocsPartitioned,
    queryAllDocs,
    postDocumentPartitioned,
    postDocument,
    deleteDocument
};
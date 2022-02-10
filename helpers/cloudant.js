// Cloudant helper methods
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { v4: uuid } = require('uuid');

// Query all docs in a database with specified partition
const queryAllDocsPartitioned = (service, dbName, partitionName) => {
    return service.postPartitionAllDocs({
        db: dbName,
        partitionKey: partitionName,
        includeDocs: true
    });
};

// Query all docs in a database
const queryAllDocs = (service, dbName) => {
    return service.postAllDocs({
        db: dbName,
        includeDocs: true
    });
};

// Add document to a database
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

// Add document to a partition in a database
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

// Delete document in a database
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
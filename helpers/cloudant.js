const queryAllDocs = (service, dbName, partitionName) => {
    return service.postPartitionAllDocs({
        db: dbName,
        partitionKey: partitionName,
        includeDocs: true
    })
}

module.exports = {
    queryAllDocs
}
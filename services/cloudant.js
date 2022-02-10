const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

const initializeCloudant = () => {
    const authenticator = new IamAuthenticator({
        apikey: process.env.CLOUD_API_KEY
    });
        
    const service = new CloudantV1({
        authenticator: authenticator
    });
        
    service.setServiceUrl(process.env.SERVICE_URL);

    return service;
}

module.exports = {
    initializeCloudant
}
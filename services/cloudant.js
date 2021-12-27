const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

const initializeCloudant = () => {
    const authenticator = new IamAuthenticator({
        apikey: 'dA6Pth3GHaEBdm3fYe8t4IFkhmb3B94dhr-xlxsyiJRa'
    });
        
    const service = new CloudantV1({
        authenticator: authenticator
    });
        
    service.setServiceUrl('https://e8e63075-c4be-42b8-8b32-566208c0c9ce-bluemix.cloudant.com');

    return service;
}

module.exports = {
    initializeCloudant
}
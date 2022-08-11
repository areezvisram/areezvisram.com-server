## My Personal Website Backend Server

### Description
* This project is the backend application for my personal website
* The React frontend can be found (here)[https://github.com/areezvisram/areezvisram.com]
* The backend is fully authenticated, which means a unique JWT token is needed to make requests to it
* The database is a NoSQL IBM Cloudant Database
* The backend server is hosted on Heroku

### Design
![architecture](/Architecture%20Diagrams/Architecture%20Image.jpeg)
* Authentication is needed, if a valid client calls the endpoint, a JWT is generated 
* That JWT can be used in further requests to authenticate the client, and data will be returned
* If an unauthorized client attempts to call the server, it will not have a valid JWT and data will not be returned
* The server makes use of caching
    * The first time a GET request is made to any endpoint, the data is returned from the database but it is also cached
    * Any subsequent calls to the endpoint do not go to the database, but instead return from the cache
    * Whenever the data is updated via a POST or PUT, the cache is cleared so the next call is the updated data from the database
* The POST and PUT endpoints also have joi param validation to ensure there is no corrupt data

### Documentation
The SwaggerHub OpenAPI documentation can be found at: [areezvisram-backend Swagger Docs](https://app.swaggerhub.com/apis/areezvisram/areezvisram-backend/1.0.0#/)
An HTML rendering of the documentation can also be found in the Documentation folder in this repository

### Technologies & Libraries Used
* NodeJS
* Express
* @ibm-cloud/cloudant
* cors
* dotenv
* http-status-codes
* ibm-cloud-sdk-core
* joi
* node-cache
* nodemon
* uuid
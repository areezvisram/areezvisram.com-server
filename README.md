## Personal Website Backend
## Areez Visram

This project is the backend application for my personal website, built with NodeJS + Express. The database is an IBM Cloudant database.

### Architecture
![architecture](https://github.com/areezvisram/areezvisram.com-server/tree/master/Architecture%20Diagrams)

### Documentation
The SwaggerHub OpenAPI documentation can be found at: [areezvisram-backend Swagger Docs](https://app.swaggerhub.com/apis/areezvisram/areezvisram-backend/1.0.0#/)
An HTML rendering of the documentation can also be found in the Documentation folder in this repository

### Backend Features
Some notable backend features besides the requirements:
* Caching
    * The `getInventory` call utilizes caching for better efficieny
    * After an initial `getInventory` call, which retrieves the data from the database, the data is cached
    * Subsequent `getInventory` calls return the data from the cache, rather than calling the database again
    * The cache is updated anytime an object is added, deleted, or edited
    * **NOTE**: The data is only cached each time you start the application. If you run the application, do a `getInventory` call, stop the application and run it again, the data will not be cached
* Request validation
    * Joi validation is used on the `POST`, `PUT`, and `DELETE` calls to ensure the request body passed is of the correct form
    * If one of the parameters is missing or in an incorrect format, a `400 BAD REQUEST` is returned

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
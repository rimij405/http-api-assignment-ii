// Import statements.
const fs = require('fs');
const mimetype = require('./../data/mimetype.js');
const router = require('./router.js');

// Data.
const data = {
    users: 0
};

// Get full JSON object response.
const sendResponseJSON = (request, response, statusCode, object) => router.sendResponse(request, response, statusCode, mimetype.JSON, JSON.stringify(object)); 

// Get meta version of JSON response.
const sendResponseJSONMeta = (request, response, statusCode) => router.sendResponseMeta(request, response, statusCode);

// Get the payload data.
const getUsers = (request, response) => {
    const responseJSON = {
        users: data.users
    };

    sendResponseJSON(request, response, 200, responseJSON);
}

// Routes associated with this.
const routes = {
    '/getUsers': getUsers
};

// Export the routes.
module.exports = {
    routes,
    sendResponseJSON,
    sendResponseJSONMeta,
}

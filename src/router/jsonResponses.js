// Import statements.
const fs = require('fs');
const qs = require('querystring');
const mimetype = require('./../data/mimetype.js');
const status = require('./../data/status.js');
const router = require('./router.js');

// Data.
const data = {
    users: 0
};

// Get full JSON object response.
const sendResponseJSON = (request, response, statusCode, object) => router.sendResponse(request, response, statusCode, mimetype.JSON, JSON.stringify(object)); 

// Get meta version of JSON response.
const sendResponseJSONMeta = (request, response, statusCode) => router.sendResponseMeta(request, response, statusCode, mimetype.JSON);

// Get the pre-configured StatusJSON repsonse.
const getStatusJSON = (code) => (status[`${code}`] ? status[`${code}`] : status['404']);

// Create a custom StatusJSON object. Supply message to overwrite the default.
const createStatusJSON = (statusCode, message = null) => {
  const statusJSON = getStatusJSON(statusCode);
  statusJSON.message = (message) || statusJSON.message;
  return statusJSON;
};

// Error handling.
const getError = (statusCode, message = null) => {
    const statusJSON = createStatusJSON(statusCode, message);
    return (request, response) => {
        if(request.method === 'HEAD'){
            sendResponseJSONMeta(request, response, statusCode, statusJSON);
        } else {
            sendResponseJSON(request, response, statusCode, statusJSON);
        }
    };
};

// Get the payload data.
const getUsers = (request, response) => {
    // Construct the object with the payload.
    const responseJSON = {
        users: data.users
    };

    // Return JSON based on GET or HEAD method.
    if(request.method === 'GET'){
        sendResponseJSON(request, response, 200, responseJSON);
    } else {
        sendResponseJSONMeta(request, response, 200);
    }
}

// Add a user.
const addUser = (request, response) => {
    
    // Process the user body.
    let body = "";
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        
        // Parse out new user.
        const newUser = qs.parse(body);
        console.dir(newUser);

        // Check if any data is missing.
        if(!newUser.name || !newUser.age){
            // Error case.
            getError(400, "Bad Request: Name and age are both required.")(request, response);
            return;
        }

        // Check if user already exists.
        if(data.users != 0 && data.users[newUser.name]){
            // User updated without a response body.
            data.users[newUser.name].age = newUser.age;
            sendResponseJSONMeta(request, response, 204);
            return;
        }

        // If completely new, prepare the data structure.
        if(data.users === 0) data.users = {};

        // Apply the new user.
        data.users[newUser.name] = {
            name: newUser.name,
            age: newUser.age
        };

        console.dir(data);
        
        // Created successfully.
        sendResponseJSON(request, response, 201, { message: "Created Successfully!" });

    });

};


// Routes associated with this.
const routes = {
    '/getUsers': getUsers,
    '/addUser': addUser
};

// Export the routes.
module.exports = {
    routes,
    sendResponseJSON,
    sendResponseJSONMeta,
    createStatusJSON,
    getError
}

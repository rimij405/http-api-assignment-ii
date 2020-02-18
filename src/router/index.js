// Combination of all routers.

// Import statements.
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Route exists?
const routeExists = (handler, route) => (handler != null && route != null && handler.routes[route]);

// Get the route.
const getRoute = (handler, route) => (routeExists(handler, route)) ? handler.routes[route] : null;

// Get the handler based on the route.
const getRequestHandler = (action) => {

    // Check if route exists for the html router.
    const handlers = [ htmlHandler, jsonHandler ];

    // Loop through all handlers and find the one that points to the needed route.
    for(let i = 0; i < handlers.length; i++){
        const handler = handlers[i];
        const requestHandler = getRoute(handler, action);
        if(requestHandler != null){
            return requestHandler;
        }
    }

    // If requestHandler doesn't exist, return null.
    console.error(`Request Handler '${action}' does not exist for any router.`);
    return null;

};

// Wrapper for the index.
const getIndex = htmlHandler.getIndex;

// General JSON error.
const getError = jsonHandler.getError;

// Not Found - 404
const getNotFound = jsonHandler.getError(404, "");

// Client Error - 400
const getClientError = jsonHandler.getError(400, "");

// Export route collection.
module.exports = { 
    getRequestHandler,
    getIndex,
    getError,
    getNotFound,
    getClientError,
};
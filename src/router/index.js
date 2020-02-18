// Combination of all routers.

// Import statements.
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Route exists?
const routeExists = (handler, route) => (handler != null && route != null && handler.routes[route]);

// Get the route.
const getRoute = (handler, route) => (routeExists(handler, route)) ? handler.routes[route] : null;

// Get the handler based on the route.
const getRequestHandler = (route) => {

    // Check if route exists for the html router.
    const handlers = [ htmlHandler, jsonHandler ];

    // Loop through all handlers and find the one that points to the needed route.
    for(let i = 0; i < handlers.length; i++){
        const handler = handlers[i];
        const requestHandler = getRoute(handler, route);
        if(requestHandler != null){
            return requestHandler;
        }
    }

    // If none returned, return the index.
    console.error(`Request Handler '${route}' does not exist for any router.`);
    return htmlHandler.getIndex;

};

// Export route collection.
module.exports = { 
    getRequestHandler
};
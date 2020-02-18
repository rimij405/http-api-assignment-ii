// Import statements.
const routers = require('./../router');

// Handle request.
const handleRequest = (request, response, parsedUrl) => {
    console.log(`Handling '${request.method}' method for '${parsedUrl.pathname}'.`);

    // Find handler for request, if one exists.
    const processRequest = routers.getRequestHandler(parsedUrl.pathname);

    // If handler is null, return not found.
    if(!processRequest){
        // Return a Not Found response.
        routers.getNotFound(request, response);
    } else {
        // Process the request if one was found.
        processRequest(request, response, parsedUrl);
    }
};

// Export the handle function.
module.exports = {
    handleRequest
}
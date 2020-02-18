// Import statements.
const routers = require('./../router');

// Handle request.
const handleRequest = (request, response, parsedUrl) => {
    console.log(`Handling 'GET' method.`);    
    const handle = routers.getRequestHandler(parsedUrl.pathname);
    handle(request, response);
};

// Export the handle function.
module.exports = {
    handleRequest
}
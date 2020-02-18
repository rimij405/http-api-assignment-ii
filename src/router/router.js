// Contains utility functions used by the router.

// Send response.
const sendResponse = (request, response, statusCode, contentType, content) => {
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.write(content);
    response.end();
};

const sendResponseMeta = (request, response, statusCode, contentType) => {
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.end();
}

// Export utility functions.
module.exports = {
    sendResponse,
    sendResponseMeta,
};
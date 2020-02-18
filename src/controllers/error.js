// Handle request.
const handleRequest = (request) => {
    console.error(`ERROR: No request handler was found for the specified HTTP protocol method '${request.method}'.`);
};

// Export the handle function.
module.exports = {
    handleRequest
}
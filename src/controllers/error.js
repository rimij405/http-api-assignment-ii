// Handle request.
const handleRequest = (request, response) => {
    console.err(`ERROR: No request handler was found for the specified HTTP protocol method.`);
};

// Export the handle function.
module.exports = {
    handleRequest
}
// Import handlers.
const getController = require('./get.js');
const postController = require('./post.js');
const errorController = require('./error.js');

// Map of actions.
const Actions = {
    'GET': getController,
    'POST': postController
};

// Handler method that returns the appropriate action for input action.
const getRequestHandler = (method) => {
    const handler = (method != null) ? Actions[method] : null;
    return ((handler != null) && (handler.handleRequest != null)) ? handler : errorController;
};

// Export handler.
module.exports = {
    getRequestHandler
};
// Import handlers.
const postHandler = require('./postHandler.js');
const getHandler = require('./getHandler.js');

// Map of actions.
const Actions = {
    'GET': getHandler.handleAction,
    'POST': postHandler.handleAction
};

// Handler method that returns the appropriate action for input action.
const getMethodHandler = (method) => {
    if(method != null && Actions[method]){
        return Actions[method];
    } else {
        return () => {
            console.error(`Unimplemented: No handler exists for input HTTP method: '${method}'.`);
        };
    }
};

// Export handler.
module.exports = {
    getMethodHandler
};
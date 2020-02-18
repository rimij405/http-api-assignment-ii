// Contains utility functions used by the router.

// Send response.
const sendResponse = (request, response, statusCode, contentType, content) => {
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.write(content);
    response.end();
};

// Send meta response (HEAD only).
const sendResponseMeta = (request, response, statusCode, contentType) => {
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.end();
};

// Send error response.
const sendError = (request, response, statusCode, errorMessage) => {
    response.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    response.write(`Error ${statusCode} from '${request.method}' request: "${errorMessage}"`);
    response.end();
};

// Check for specific set of accept headers.
const acceptsTypes = (mimetypes, request, response) => new Promise((resolve, reject) => {
    const accepts = request.headers.accept.split(',');
    if (accepts && accepts.length > 0) {
      for (let i = 0; i < accepts.length; i++) {
        for (let j = 0; j < mimetypes.length; j++) {
          if (accepts[i] === mimetypes[j]) {
            resolve(request, response);
          }
        }
      }
      reject(new Error(`Does not accept type(s): ${mimetypes.join(',')}.`));
    } else {
      reject(new Error('No accept headers provided.'));
    }
  });
  
// Check for specific accept header.
const acceptsType = (mimetype, request, response) => acceptsTypes([mimetype], request, response);

// Export utility functions.
module.exports = {
    sendResponse,
    sendResponseMeta,
    sendError,
    acceptsType,
    acceptsTypes
};
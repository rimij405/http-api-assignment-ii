// Server.js for http-api-assignment-ii
const http = require('http');
const url = require('url');
const controllers = require('./controllers');

// Port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// On request to the server, process the route.
const onRequest = (request, response) => {

    // Parse URL.
    const parsedUrl = url.parse(request.url);

    // Obtain the request handler for the specified HTTP protocol method.
    const controller = controllers.getRequestHandler(request.method);
 
    // Pass along the request and response object.
    controller.handleRequest(request, response, parsedUrl);

};

// Create and listen to the server.
http.createServer(onRequest).listen(port);

// Debug messages.
if(port === 3000){

    // If the port is 3000, print this debug message.
    console.log(`Listening to server at 127.0.0.1:${port}`);

}
// Server.js for http-api-assignment-ii
const http = require('http');
const { route } = require('./router/router.js/index.js');

// Port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// On request to the server, process the route.
const onRequest = (request, response) => {
    route(request, response);
};

// Create and listen to the server.
http.createServer(onRequest).listen(port);

// Debug messages.
if(port === 3000){
    console.log(`Listening to server at 127.0.0.1:${port}`);
}
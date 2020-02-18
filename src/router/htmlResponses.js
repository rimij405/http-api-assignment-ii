// Import statements.
const fs = require('fs');
const mimetype = require('./../data/mimetype.js');
const router = require('./router.js');

// Get the static references.
const index = fs.readFileSync(`${__dirname}/../../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../../client/style.css`);

// Get the index.
const getIndex = (request, response) => router.sendResponse(request, response, 200, mimetype.HTML, index);

// Get the CSS.
const getCSS = (request, response) => router.sendResponse(request, response, 200, mimetype.CSS, css);

// Routes associated with this.
const routes = {
    '/': getIndex,
    '/index.html': getIndex,
    '/style.css': getCSS
};

// Export the routes.
module.exports = {
    routes,
    getIndex,
    getCSS
}

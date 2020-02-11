// Handle HTML pages.
const fs = require('fs');
const mimetype = require('./mimetype.js');


// Generic routes.
const routes = {
    '/': htmlHandler.getIndex
};

// 
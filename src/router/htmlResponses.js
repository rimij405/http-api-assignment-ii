// Import statements.
const fs = require('fs');
const mimetype = require('./../data/mimetype.js');
const router = require('./router.js');

// Get the static references.
const index = fs.readFileSync(`${__dirname}/../../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../../client/style.css`);

// Get the index.
const getIndex = (request, response) => {
  router.sendResponse(request, response, 200, mimetype.HTML, index);
};

// Get the CSS.
const getCSS = (request, response) => {
  router.sendResponse(request, response, 200, mimetype.CSS, css);
};

// Get a particular file.
const getFile = (request, response, filename, filetype) => {
  fs.readFile(`${__dirname}/../../client/${filename}`, (err, data) => {
    if (err) {
      router.sendError(request, response, 404, err);
    } else {
      router.sendResponse(request, response, 200, filetype, data);
    }
  });
};

// Get JS file.
const getScript = (request, response, filename) => {
  getFile(request, response, filename, mimetype.JS);
};

// Routes associated with this.
const routes = {
  '/': getIndex,
  '/index.html': getIndex,
  '/style.css': getCSS,
  '/index.js': (request, response) => {
    getScript(request, response, 'src/index.js');
  },
  '/form.js': (request, response) => {
    getScript(request, response, 'src/form.js');
  },
  '/ajax.js': (request, response) => {
    getScript(request, response, 'src/ajax.js');
  },
};

// Export the routes.
module.exports = {
  routes,
  getIndex,
};

"use strict"; // Contains helper methods for sending AJAX requests.
// Prepare XMLHttpRequest.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendAjax = exports.createXHR = void 0;

var createXHR = function createXHR(method, url, acceptedType, callback) {
  // Create the request.
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);

  if (acceptedType != null) {
    xhr.setRequestHeader("Accept", acceptedType);
  }

  xhr.onload = function () {
    return callback(xhr);
  }; // Request isn't sent here. Simply return prepared request.


  return xhr;
}; // Send XMLHttpRequest


exports.createXHR = createXHR;

var sendAjax = function sendAjax(method, url, acceptedType, callback) {
  // Prepare the request and then send it.
  createXHR(method, url, acceptedType, callback).send();
}; // Export list.


exports.sendAjax = sendAjax;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJSON = void 0;

// Parse JSON.
var parseJSON = function parseJSON(xhr, content) {
  // Parse the response JSON.
  var obj = JSON.parse(xhr.response);
  console.dir(obj); // Display to content element.
}; // Export list.


exports.parseJSON = parseJSON;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ajax = _interopRequireWildcard(require("./ajax"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Import modules.
// Handle Response.
var handleResponse = function handleResponse(xhr) {
  var content = document.querySelector('#content');
}; // Send post.


var sendPost = function sendPost(e, nameForm) {
  ajax.sendAjax('GET', '/', 'text/html', handleResponse);
}; // Initialized method on client side.


var init = function init() {
  var nameForm = document.querySelector('#nameForm');

  var addUser = function addUser(e) {
    return sendPost(e, nameForm);
  };

  nameForm.addEventListener('submit', addUser);
}; // Run init on startup.


window.onload = init;

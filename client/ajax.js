"use strict";

// Contains helper methods for sending AJAX requests.

// Prepare XMLHttpRequest.
const createXHR = (method, url, acceptedType, callback) => {

    // Create the request.
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if(acceptedType != null) {
        xhr.setRequestHeader("Accept", acceptedType);
    }
    xhr.onload = () => callback(xhr);

    // Request isn't sent here. Simply return prepared request.
    return xhr;

};

// Send XMLHttpRequest
const sendAjax = (method, url, acceptedType, callback) => {

    // Prepare the request and then send it.
    createXHR(method, url, acceptedType, callback).send();    

};

// Export list.
export {
    createXHR,
    sendAjax
}
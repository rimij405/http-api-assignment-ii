"use strict";

// Contains helper methods for sending AJAX requests.

// Prepare XMLHttpRequest.
const createXHR = (method, action, headers, callback) => {

    // Create the request.
    const xhr = new XMLHttpRequest();
    xhr.open(method, action);

    // If headers are non-null, add each to the request header.
    if(headers != null){
        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });
    }

    // Set the callback for the request.
    xhr.onload = () => callback(xhr);

    // Request isn't sent here. Simply return prepared request.
    return xhr;

};

// Send XMLHttpRequest
const sendAjax = (method, action, headers, callback) => {

    // Prepare the request and then send it without passing along any information.
    createXHR(method, action, headers, callback).send();    

};

// Response handlers.

// Parse JSON from xhr response and pass it back.
const parseResponseJSON = (xhr) => {
    // Parse the response JSON.
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
    return obj;
};

// Handle Response.
const handleClientError = (err) => {
    // Print the error.
    console.error(err);

    const content = document.querySelector("#content");
    content.innerHTML = `<h1>Client Error</h1><p>${err.message}</p>`;
};

// Handle post response.
const handlePostResponse = (xhr) => {
    console.log("POST");

    // Get content to display.
    const content = document.querySelector("#content");
    let responseJSON = undefined;

    // Based on switch, display right message.
    switch(xhr.status){
        case 201:
            responseJSON = parseResponseJSON(xhr);
            content.innerHTML = `<h1>Create</h1><p>Message: ${responseJSON.message}</p>`;
            break;
        case 204:
            content.innerHTML = `<h1>Updated (No Content)</h1>`;
            break;
        case 400:
            responseJSON = parseResponseJSON(xhr);
            content.innerHTML = `<h1>Client Error</h1><p>${responseJSON.message}</p>`;
            break;
    }

};

// Handle get response.
const handleGetResponse = (xhr) => {
    console.log("GET");
    const content = document.querySelector("#content");
    const body = parseResponseJSON(xhr);

    switch(xhr.status){
        case 200:
            console.log(body);
            // If body is wrong, an error must have occured.
            if(!body || !body.users || body.users === 0){
                content.innerHTML = `<h1>Success</h1><p>No users.</p>`;
            } else {
                const responseStr = JSON.stringify(body.users);
                content.innerHTML = `<h1>Success</h1><p>${responseStr}</p>`;
            }
            break;
        case 404:
            content.innerHTML = `<h1>Resource Not Found</h1><p>${body.message}</p>`;
            break;
    }

};

// Handle head response.
const handleHeadResponse = (xhr) => {
    console.log("HEAD");
    const content = document.querySelector("#content");
    switch(xhr.status){
        case 200:
            content.innerHTML = `<h1>Success</h1>`;
            break;
        case 404:
            content.innerHTML = `<h1>Resource Not Found</h1>`;
            break;
    }
    
};

// Get response handler based on the input method.
const getResponseHandler = (method) => {
    switch(method){
        case 'post':
            return handlePostResponse;
            break;
        case 'get':
            return handleGetResponse;
            break;
        case 'head':
            return handleHeadResponse;
            break;
    };
    return handleClientError;
};


// Default export.
export default {
    createXHR,
    sendAjax,
    parseResponseJSON,
    getResponseHandler,
    handleClientError
};
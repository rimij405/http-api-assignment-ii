// Import the ajax helper methods.
import ajax from './ajax.js';

// Helper methods.

// Get value from a field, if it exists. If field doesn't exist, returns null.
const getValueOf = (form, fieldSelector) => {
    const field = form.querySelector(fieldSelector);
    return (field) ? field.value : null;
};

// Get action from form.
const getAction = (form) => {
    const fieldAction = getValueOf(form, "#urlField");
    return (fieldAction) ? fieldAction : form.getAttribute('action');
}

// Get method from form.
const getMethod = (form) => {
    const fieldMethod = getValueOf(form, "#methodSelect");
    return (fieldMethod) ? fieldMethod : form.getAttribute('method');
};

// Get the request metadata from the input form itself.
const getRequestInfo = (form) => {
    if(form) {
        return {
            action: getAction(form),
            method: getMethod(form)
        }
    }

    // If form is null, return null.
    return null;
};

// Prepare payload data as form data.
const prepareFormData = (payload) => {
    const data = [];
    Object.keys(payload).forEach((key) => {
        // if(payload[key]){
            data.push(`${key}=${payload[key]}`);
        // }
    });
    return (data && data.length > 0) ? data.join('&') : data.join('&');
};

// SEND POST

// Send post with payload.
const sendPost = (nameForm, onError, action) => {

    // Set the method.
    const method = 'post';

    // Prepare the user payload.
    const payload = {
        name: getValueOf(nameForm, "#nameField"),
        age: getValueOf(nameForm, "#ageField")
    };

    // Format the form data from the payload.
    const formData = prepareFormData(payload); 

    // If formData is null, generate an error.
    if(!formData) { 
        onError({
            message: "Form data is empty",
            form: nameForm
        });
        return;
    }

    // If not null, go ahead and prepare the XHR.
    const xhr = ajax.createXHR(method, action, {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }, ajax.getResponseHandler(method))

    // Send the form with the form data.
    xhr.send(formData);

};

// SEND QUERY (GET or HEAD)

// Send query with payload.
const sendQuery = (userForm, onError, action, method) => {

    // Validate request.
    if(!action || !method){
        onError({
            message: "Missing action or method.",
            form: userForm
        });
        return;
    }

    // Create the request.
    ajax.sendAjax(method, action, {
        'Accept': 'application/json'
    }, ajax.getResponseHandler(method));

};

// Process form submission.
const processSubmission = (e, form, onError) => {

    // Prevent default browser action.
    e.preventDefault();

    // Get the request info from the form.
    const info = getRequestInfo(form);

    // Based on the request method, determine the send to call.
    if(info.method === 'post'){
        sendPost(form, onError, info.action);
    } else {
        sendQuery(form, onError, info.action, info.method);
    }
    
};

// Default export.
export default {
    processSubmission
};

// Named exports.
export { 
    getAction,
    getMethod,
    getValueOf,
    getRequestInfo,
    prepareFormData,
};

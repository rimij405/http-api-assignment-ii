// Import modules.
import formHandler from './form.js';
import ajax from './ajax.js';

// Initialized method on client side.
const init = () => {

    // Retrieve the forms.
    const nameForm = document.querySelector("#nameForm"),
          userForm = document.querySelector("#userForm");

    // Process the name form on submission.
    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formHandler.processSubmission(e, nameForm, (err) => {
            ajax.handleClientError(err.message);
        });
    });

    // Process the user form on submission.
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formHandler.processSubmission(e, userForm, (err) => {
            console.log(err);
        });
    });

};

// Run init on startup.
window.onload = init;
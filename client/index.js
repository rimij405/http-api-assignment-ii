// Import modules.
import * as ajax from './ajax';

// Handle Response.
const handleResponse = (xhr) => {
    const content = document.querySelector('#content');

};

// Send post.
const sendPost = (e, nameForm) => {
    ajax.sendAjax('GET', '/', 'text/html', handleResponse);
};


// Initialized method on client side.
const init = () => {
    const nameForm = document.querySelector('#nameForm');
    const addUser = (e) => sendPost(e, nameForm);
    nameForm.addEventListener('submit', addUser);
};

// Run init on startup.
window.onload = init;
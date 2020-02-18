// Parse JSON.
const parseJSON = (xhr, content) => {
    // Parse the response JSON.
    const obj = JSON.parse(xhr.response);
    console.dir(obj);

    // Display to content element.
};

// Export list.
export {
    parseJSON
}
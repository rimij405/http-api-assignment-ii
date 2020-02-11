// Helper function for manipulating headers.

// Set single header directly.
const setHeader = (headers, header, value) => {
    if(headers && header) {
        headers[header] = value;
    }
};

// Remove a header from the headers object.
const clearHeader = (headers, header) => {
    if(headers && header){
        setHeader("");
        delete headers[header];
    }
};

// If headers object exists, we can append an array.
const appendHeaders = (headers, entries) => {
    if(headers && entries){
        if(Array.isArray(entries)){
            for(let i = 0; i < entries.length; i++){
                setHeader(headers, entries.header, entries.value);
            }
        } else {
            Object.keys(entries).forEach((key) => {
                setHeader(headers, key, entries[key]);
            });
        }
    }
};

// Export functions.
module.exports = {
    setHeader,
    clearHeader,
    appendHeaders
}
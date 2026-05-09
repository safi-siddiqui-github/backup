// Network Request
// fetch data inside webpage

// In early days this technique was knwon as asynchronous Javascript and XML (AJAX)
// bcz it tended to request XML data, but these days we request JSON, same term AJAX is used

// Fetch API
// fetch is a global function
// fetch is asynchronous so returns promise 
// as promise is returned we pass we pass a function into then() method of returned promise  
// then method is called when HTTP request receives a response from server
// catch runs if the promise failed 

// JSON
// response.json() returns data in json form

// Binary Large Object
// response.blob() returns response as image file, represents large file like objects eg images videos

let todoOne;
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json()
        // return response.blob()
    })
    .then((response) => console.log(response))
    .catch((error) => {
        console.error(error)
    })

// XMLHttpRequest 
// abbreviated as XHR
// older code, predated Fetch

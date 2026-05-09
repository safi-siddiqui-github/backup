// Asynchronous JavaScript
// Asynchronous programing is a technique that enables your program to start
// a long running task and still be able to be responsive to other events 
// while that task runs, rather then having to wait until the task has finished

// examples
// making http request using fetch()
// accessing a users camera or microphone using getUserMedia()
// asking a user to select files using showOpenFilePicker()

// Synchronous Programming
// Browser interprets / transaltes each line of code and wait for its result 
// Browser reads each expression in script and wait for its result 
// Functions and other code will run before 
// our program is completely unresponsive until long-synchronous function runs

// Callbacks
// its a function passed into another function
// callbacks were the main way asynchronous functions were iplemented in js
// callback hell occurs when many functions are nested into each other

function wait() {
    setTimeout(() => {
        console.log('waited for 5 seconds');
        printThis('After Waiting')
    }, 5000);
}

function printThis(data) {
    console.log(data);
}

// wait()
// printThis('welcome')

// Promises
// Foundations of asynchronous programming
// Its an object returned by async function which represents the current state of operation
// At the time the promise is returned to the caller, the operation often isnt finished
// but promise object provides methods to handle success and failure of operation
// Promise { <pending> } - shows that operation is in pending state
// handler function is passed into .then() that passes Response Object from server


let operation = fetch('https://jsonplaceholder.typicode.com/todos/1')
// console.log(operation);

// Chaining promises
// once we get the response object we need to call another function to get the data
// as json() is also asynchronous we chain another handler to it, calling two async functions
// then() itseld returns a promise
// handler passed to then is called when the asynchronous opertaion succeeds

// Catching Erros
// server erros, wrong URL
// handler passed to catach is called when the asynchronous opertaion fails


operation
    .then((res) => {
        if (!res.ok) {
            throw new Error("API Error");
        }
        return res.json()
    })
    .then((res) => {
        // console.log(res);
        // console.log(operation);
    })
    .catch((error) => {
        console.error(error);
    })

// Promise Terminology
// promise can be in pending, fulfilled, rejected

// Combining multiple promises
// In order to run a function after an async function we use promise chaining
// but when we need all promises to be fulfilled and they dont depend on each other we use
// Promise.all() method takes an array of promises and returns a single promise
// its fulfilled when all promises fulfill, and rejected if any one rejects

let settledOne = Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos/1'),
    fetch('https://jsonplaceholder.typicode.com/posts/1'),
    fetch('https://jsonplaceholder.typicode.com/users/1'),
])
    .then((responses) => {
        Promise.all(responses.map((each) => each.json()))
            .then((responses) => {
                // console.log(responses);
            })

    })

// Async and await 
// Simpler way to work with promise-based code is to use async keyword on function
// await keyword waits for the promise to be settled
// await forces asynchronous operations to be completed in series
// if result is not dependant then use Promise.all()

async function settledTwo() {
    try {
        let a = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        // let a = await fetch('https://jsonplaceholder.typicode.com/todosshop/1') // Error A
        let b = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        let c = await fetch('https://jsonplaceholder.typicode.com/users/1')

        let d = a.ok ? await a.json() : (() => { throw new Error('Error A') })()
        let e = b.ok ? await b.json() : (() => { throw new Error('Error B') })()
        let f = c.ok ? await c.json() : (() => { throw new Error('Error C') })()

        console.log(d, e, f);

    } catch (error) {
        console.error(error);
    }
}

// settledTwo()
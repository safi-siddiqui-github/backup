// Functions
// Store a piece of code
// Instead of typing the same code multiple times
// Methods, Functions that are part of objects
// Built-in functions are defined in the browser
// Custom functions are defined in the code
// Code with paranthesis after it are functions
// Functions, (function declarations) are hoisted, they can run before being declared 
// Redeclarable, last declared is used 
// naming convention same as variables
// Functions may or may not return

let text;

// parameter, number
function randomFloor(number) {
    // Math.random only generates decimal number btw 0 and 1
    return Math.floor(Math.random() * number)
}

// call a function
text = randomFloor(3)
// console.log(text);

// replace('this', that) - two parameters

// Join
// join's parameter is optional
// join by default uses ,

let myCollection = ['This', 'is', 'new', 'collection']
text = myCollection.join()
// console.log(text);

// Default parameters
// in order to support optional parameters use = with value 
function add(num1 = 0, num2 = 0) {
    return num1 + num2;
}
text = add();
// console.log(text);

// Anonymous function
// Function having no name
// in order to use anonymous, last written code must be ended using semicolon
// these function expressions are not hoisted
(function () {
    text = 'Anonymous'
})();
// console.log(text);

// Arrow functions
// instead of using anonymous functions use arrow functions
// Use arrow functions if the code is only one liner
(() => text = 'Arrow')();
// console.log(text);

// Function scope and conflicts
// variables functions and other code defined inside the function 
// are only defined inside the functions are inside their own seperate scope
// locked in seperate compartments, unreachable from outside
// everything defined outisde functions has global scope
// gloabls can reach anywhere in code
function run() {
    function nested() {
        text = 'nested' // global
    }
    nested()
}
// run()
// nested() // undefined
// console.log(text);

// Returning functions 
myCollection = 'Text is replaced by text'
text = myCollection.replace('text', 'code');
// console.log(text);

// Void - Undefined Functions
function print(){
    console.log('void function');
}
// print()

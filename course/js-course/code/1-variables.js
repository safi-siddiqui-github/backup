// Declare variable
let myName; // undefined
// Initialize Variable
myName = 'JS';

// confusing and error-prone
someOne = 'Not-JS'
var someOne;
// works bcz of hoisting
// console.log(someOne);
// redeclaration
var someOne;

// Update variable
// console.log(myName);
myName = 'JavaScript';
// console.log(myName);

// Naming
// only alphanumeric, camelCase, description
// not at start _, 123, 
// case-sensitive myage !== myAge
// no reserved words let, const, function, var 

// Types
let myAge = 50 // Number (integers/decimal)
// myName // String
let isAdmin = true; // Boolean 
let languages = ['js', 'react']; // Array - Single object with multiple values
let myHouse = {
    name: 'house',
    rooms: 4,
    garage: true
}
// console.log(myName, myAge, isAdmin, languages, languages[0], myHouse, myHouse.name);

// Dynamically typed - no need to specify datatype
// console.log(typeof myAge);
// myAge = isAdmin
// console.log(typeof myAge);
// console.log(typeof isAdmin);
// isAdmin = myName
// console.log(typeof isAdmin);

// Constants
const myCar = 'Car';
// must initialize when declaring
// cant update numbers, string, booleans, but objects arrays
const myVehicle = {
    name: 'Car'
}
// console.log(myVehicle);
myVehicle.name = 'Cars'
// console.log(myVehicle);

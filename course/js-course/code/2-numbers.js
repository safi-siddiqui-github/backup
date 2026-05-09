// JS has only one type of numebrs - Number

// Types
// integers - without a fraction
let myAge = 50
// Can be negative
let myDebt = -20;
// Floats - floating point numbers - decimals
let myChange = 10.5;

// Number Object - an instance that represents all standard numbers
let myChangeFixedToFive = myChange.toFixed(5)
// console.log(myChangeFixedToFive);

// Convert to number types
let myHouses = '5';
// console.log(typeof myHouses);
myHouses = Number(myHouses);
// console.log(typeof myHouses);

// Airthmetic Operations
// Operator precedence - BODMAS
let myAdd = myAge + myDebt;
let mySubtract = myAge - myDebt;
let myMultiply = myAge * myDebt;
let myDivide = myAge / myDebt;
let myModulus = myAge % 5; // remainder
let myExponent = myAge ** 2;

// console.log(
//     myAdd,
//     mySubtract,
//     myMultiply,
//     myDivide,
//     myModulus,
//     myExponent,
// );

// Increment / Decrement Operator
// console.log(myAge);
//  myAge = myAge + 1;
myAge++
// console.log(myAge);
myAge--
// console.log(myAge);

// Assignemnt Operator
// Basic =
myAge += 50 // myAge = myAge + 50
// console.log(myAge);
myAge -= 50
// console.log(myAge);
myAge *= 50
// console.log(myAge);
myAge /= 50
// console.log(myAge);

// Comparison Operators
// Strict equality - test identical values / type 
let myTest = myAge === myAge
// console.log(myTest);
myTest = myAge !== myDebt // non-equality
// console.log(myTest);
myTest = myAge > myDebt
// console.log(myTest);
myTest = myAge < myDebt
// console.log(myTest);
myTest = myAge >= myDebt
// console.log(myTest);
myTest = myAge <= myDebt
// console.log(myTest);



// Conditionals
// IF-ELSE-Statements
// curly-braces
let condition = false
condition = 'string'
let check;
if (condition === true) {
    check = 'Its true'
} else if (condition === false) { // chain extra choices
    check = 'Its false'
} else {
    check = 'Its Neither'
}
// console.log(check);

// Comparison Opertators
// reference in numbers
// === !== < > <= >=

let myAge = 50
if (myAge > 20) {
    check = 'Text is greater then 20'
}
// console.log(check);

// False values
// false, undefined, null, 0, NaN, ''
// else all are true value

condition = myAge !== ''
if (condition) {
    check = 'myAge is not empty string'
}
// console.log(check);

// Nested IF-ELSE
myAge = 50
if (myAge > 20) {
    if (myAge < 70) {
        check = 'age > 20 and age < 70'
    }
}
// console.log(check);

// Logical Operators 
// && - test true for multiple conditions
if (myAge > 20 && myAge < 70) {
    check = 'age > 20 and age < 70'
}
// console.log(check);

// || - test true for any condition
if (myAge > 20 || myAge < 50) {
    check = 'age > 20 || age < 50'
}
// console.log(check);

// Brackets
if ((myAge > 20 || myAge < 50) && myAge < 70) {
    check = '(age > 20 || age < 50) && age < 70'
}
// console.log(check);

// Swith statements
// case is condition
// break - breaks the flow and moves browser after switch statement
// break - if break is not applied then all consitions are run
// default - if none of the cases are true
myAge = 50
switch (myAge) {
    case 50:
        check = 'age = 50'
        break;

    default:
        check = 'age != 50'
        break;
}
// console.log(check);

// Ternary Operator
check = myAge > 20 ? 'age > 20' : 'age >! 20'
// console.log(check);

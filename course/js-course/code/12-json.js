// JavaScript Object Notation
/*
Standard text-based format for representing structured-data based on javascript object syntax
JSON object provides methods for parsing and generating json 

Conversting a string into native object is called deserialization,
converting object to string is called serialization, to tranmist accros network 

Arrays can be converted to/from json

*/

// Json Syntax limitation
/*
Any json is valid js literal, but converse is not true

For primitive, Json can only contain string literals, number literals, boolean and null 
For non-primitive, Json can only be object literals and array literals, not function, date, set, map

Stirng must eb enclosed in double quotes
each proeprty must be "key":"value" pair
cannot have trailing commas
comments are not alowed

*/

// JSON Object
// accepts a json string as parameter and returns js object
let objOne = JSON.parse("{\"name\":\"js\"}")
console.log(objOne, objOne.name);
objOne.age = 50

// accepts a js object and returns json string
let objTwo = JSON.stringify(objOne)
console.log(objTwo);


// Strings
let myName = 'Name';

// Single , Double quotes, Backticks `
// both single and double are same, adhere to one style
// Template literals
// we can embed js into template literals
let myBio = `${myName} is a property.`
let myMultiLine = `Hi,
                   This is a welcome message.
`;
// console.log(myMultiLine);

// Concatenate using +
let myDescription = myName + ', ' + myBio;
// console.log(myDescription);

// Escaping Characters
myBio = 'We\'ve been late this week.'
// console.log(myBio);

// Number and strings
let myAge = 50;
let myMails = "50"
let myAdd = myAge + myMails
// console.log(myAdd);
myAdd = myAge + Number(myMails)
// console.log(myAdd);

let myHouses = 'Houses'
let myAgeToText = String(myAge)
myBio = `${myAgeToText} ${myHouses}`
// console.log(myBio);

// String Methods
// returns new string
myName = 'JS'
let wordCount = myName.length
// console.log(wordCount);

// Retrieving Specific characters
// console.log(myName[0]);

// Testing substring
let isIncludes = myName.includes('JS')
let startsWith = myName.startsWith('J')
let endsWith = myName.endsWith('J')
// console.log(isIncludes, startsWith, endsWith);

// Index of substring
myBio = 'Text written to find index for code'
let occurrance = myBio.indexOf('code');
// console.log(occurrance);

// Extracting multiple occurrances
myBio = 'Text code written to find code index for code'
occurrance = myBio.indexOf('code');
// console.log(myBio.indexOf('code', occurrance+1));

// Extracting substring
myBio = 'Text code written to slice substring'
myDescription = myBio.slice(0, 21) // a subset
// console.log(myDescription);
myDescription = myBio.slice(21) // remaining string
// console.log(myDescription);

// Changing Case
myName = 'JavaScript'
let capitalCase = myName.toUpperCase()
let lowerCase = myName.toLowerCase()
// console.log(capitalCase, lowerCase);

// Updating parts of string
myBio = 'Lives near park, from that park'
myDescription = myBio.replace('park', 'zoo') // first occurance
// console.log(myDescription);
myDescription = myBio.replaceAll('park', 'zoo') // multiple occurance
// console.log(myDescription);

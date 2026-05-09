// Arrays
// Single objects that contain multiple values
let colors = ['black', 'white'] // array of strings
const mixed = ['black', 5, false] // array of mixed-data type

let colorsLength = colors.length;
// console.log(colorsLength);

// Accessing - Modifying items
let anyText = colors[0] // access
// console.log(anyText);
colors[1] = 'blue' // modify
anyText = colors[1]
// console.log(anyText);

// Multidimensional Array
const multiDimensions = [5, [7, 9]]
const getValueOfNine = multiDimensions[1][1]
// console.log(getValueOfNine);

// Finding index
colors[1] = 'white'
let indexOfWhite = colors.indexOf('white')
// console.log(indexOfWhite);
let indexOfBlue = colors.indexOf('blue') // -1 incase of no items
// console.log(indexOfBlue);

// Adding Items
colorsLength = colors.length
// console.log(colors, colorsLength);
colors.push('blue') // appends at the end
colorsLength = colors.length
// console.log(colors, colorsLength);
colors.unshift('green') // appends at the beginning
colorsLength = colors.length
// console.log(colors, colorsLength);

// Removing Items
colors.pop() // remove from end
colorsLength = colors.length
// console.log(colors, colorsLength);
colors.shift() // remove from beginning
colorsLength = colors.length
// console.log(colors, colorsLength);

// Splice - remove single / multipe using index
// first argument is starting position
// second argument is number of items
colors.push('blue')
indexOfBlue = colors.indexOf('blue')
// console.log(indexOfBlue);
// console.log(colors);
colors.splice(indexOfBlue, indexOfBlue)
// console.log(colors);

// Accessing every items
for (const item of colors) {
    // console.log(item);
}

// Map returns a new array of modified items
// function runs for every item
let colorsUpdated = colors.map(function (item) {
    return `Color: ${item}`
})
// console.log(colorsUpdated);

// Filter an array based on condition
// only add items that return true
colorsUpdated = colorsUpdated.filter(function (item) {
    return item.includes('white')
})
// console.log(colorsUpdated);

// Converting btw strings and arrays
// Split - split items into an array
let myText = 'All items are splitted'
// console.log(myText, myText.length);
let splitArray = myText.split(' ') // split by space
// console.log(splitArray, splitArray.length);
// Join
let joinText = splitArray.join(' ')
// console.log(joinText, joinText.length);
// join using toString, but only joined using ,
joinText = splitArray.toString()
// console.log(joinText, joinText.length);
// Loops
// repeating a logic multiple times
// initializer (counter-variable)
// condition (when loop should stop)
// final-expression (bring loop to end)

for (let index = 0; index < 2; index++) {
    // console.log(index);
}

// Collection Array
let myCollection = ['item-1', 'item-2', 'item-3'];
for (const item of myCollection) {
    // console.log(item);
}

// Specialized Loops - map, filter
let modifiedCollection;
modifiedCollection = myCollection.map(function (item) {
    return item.toUpperCase()
})
// console.log(modifiedCollection);
modifiedCollection = myCollection.filter(function (item) {
    return item.includes('-1')
})
// console.log(modifiedCollection);

// Exit looping with breaks
// breaks the loop execution adn move browser after loop
for (let index = 0; index < 3; index++) {
    if (index === 1) {
        break;
    }
    // console.log(index);
}

// Skipping iterations with continue
for (let index = 0; index < 3; index++) {
    if (index === 1) {
        continue;
    }
    // console.log(index);
}

// While Loop
// initializer is set before the loop
// final expression is set inside the loop
let index = 0;
while (index < 2) {
    // console.log(index);
    index++
}

// Do While Loop
// loop is always exectued atleast one
index = 0;
do {
    // console.log(index);
    index++

} while (index < 2)

// execution one-time , when condition is false
index = 0;
do {
    // console.log(index);
    index++

} while (index < 1)
// Object literal
let room = {
    name: 'kids', // property
    doThis: function () { // anonymous function
        console.log(`Room is for ${this.name}`)
    },
    doThat() { // method
        console.log(`Room is for ${this.name}`)
    }
}
// room.doThat()

// factory function returns new object each time its called
function roomFactory(name /* parameter variables */) {
    return {
        name,
        doThis: function () {
            console.log(`Room is for ${this.name}`)
        },
    }
}
// roomFactory('John').doThis()

// constructor functions
// Its used to instantiate new object in js
// to assign properties and methods use this keyword which refrences current obj 
// Before es6, js had no native classes instead
// js used functions and new keyword to mimic class like behaviour
// technique known as constructor function
// Pascal case for naming constructor functions
function Room(name) {
    this.name = name;
    this.doThis = function () {
        console.log(`Room is for ${this.name}`)
    };
}
// let kidsRoom = new Room('John'); // instance
// kidsRoom.doThis();

// Constructor Property
// special property
// this property refrences hte function taht was used to create the obj via new keyword
// in order to find which constructor function creates an obj
// we can access using constructor property
// let kidsRoom = new Room('John');
// console.log(kidsRoom.constructor);

// Functions are objects
// like any obj fn can have proeprties, methods
// it can be assigned to variables or passed as arguments
// length returns the number of expected arguments
function add(num1, num2) {
    return num1 + num2;
}
// let addF = add;
// console.log(addF(2, 2), addF.length);

// Js has eight diff data types 
// 7 primitive types, 1 complex type
// p - number, string, boolean, BigInt, undefined, null , Symbol, 
// eight is object that encompasses arrays and functions
// these all are distinguished due to how they are allocated and manged in memory 
// primitive types are passed by values, if we assign a p to another p, so value is passed by copy
// if we change one value, it wont effect another one 
let a = 1
let b = a
a = 2
// console.log(b);

// Reference types
// both variables point to same obj in memory, thus changes are reflected
a = { value: 10 }
b = a
a.value = 50
// console.log(b);

// Objects
// objects in js are inherently dynamic, 
// whcih means we can add or modify properties and methods anytime after the creation 
// using the const keyword with an object declaration
// ensuring variable cannot be reassign after declaration
// but object contents can be altered
// dot / square notation

const tree = {
    name: 'Maple'
}
tree.leaves = 1000000;
// console.log(tree['name'], tree.leaves);
delete tree.leaves
// console.log(tree);

// Enumerating porperties
let nums = [1, 2, 3, 4]
for (const item in nums) { // iterate over items
    // console.log(item);
}

const dog = {
    name: 'Max',
    tail: 2
}
for (const item in dog) { // iterate over keys
    // console.log(item, dog[item]);
}

const dogKeys = Object.keys(dog)
for (const key of dogKeys) {
    // console.log(key);
}

const dogValues = Object.values(dog)
for (const value of dogValues) {
    // console.log(value);
}

const dogEntries = Object.entries(dog)
for (const enrty of dogEntries) {
    // keys and values both in arrays [[][]]
    // console.log(enrty);
}

// Abstraction
// Hide complex details adn providing essentials
function AbsFN(name) {
    this.name = name
    this.doThis = function () {
        console.log(this.name);
    }

    // Public method
    this.pub = function () {
        console.log(`Public: name is ${this.name}`);
    }

    // Private method
    // as this context refers to function its enclosed
    // in order to use the parent property we use bind
    const pri = function () {
        console.log(`Private: Person is ${this.name}`);
    }.bind(this)

    // Pub
    this.pul = function () {
        pri();
    }
}

const absC = new AbsFN('John')
// absC.pub()
// absC.pul()
// absC.pri() // TypeError: absC.pri is not a function

// Pri methods and properties
// closures in js are powerful way to achieve encapsulation
// closure means that an inner function has access to variables declared in outer functions
// this allows to hide internal state functionality of an obj and exposing only what is necessary to outside world
// scope is the context in which variables and expressions are visible or can be referenced
// if a variable is not in the current scope its unavailable 

function encFunOne() {
    const num = 5

    function display() {
        console.log(num);

    }

    display()
}

// encFunOne()

function encFunTwo() {
    const num = 5

    return function display() {
        console.log(num);
    }
}

const eft = encFunTwo()
// eft()

function EncFunThree() {
    let num = 0

    function inc() {
        num++;
    }

    return {
        l: () => console.log(num),
        i: () => inc()
    }
}

// Destructure
// const { l, i } = new EncFunThree()
// l()
// i()
// l()

// Getters & Setters
// special methods to provide way to get and set porps and methods
// also known as accessors and mutators

function GSFunc(name) {

    let pn = `Name is ${name}`;

    Object.defineProperties(this, {
        'name': {
            get: function () {
                return pn;
            },
            set: function (nv) {
                pn = `Name is ${nv}`;
            }
        }
    })
}

const igsf = new GSFunc('John');
// console.log(igsf.name);
// igsf.name = 'Jack'
// console.log(igsf.name);


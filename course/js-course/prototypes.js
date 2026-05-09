// Inheritance
// redeuces code duplication so an obj can inherit properties and methods from another obj
// terms are base class, super class, parent class -- these all mean same
// all means the class from which other class inherits properties and methods
// derived class, sub class, child class -- synonymous (same meaning)
// classes that inherit props and methods from another class
// is-a relationship indicates derived class is a specialized form of base class
// types - classical = found in class based languages, not used by js
// type - prototypical - specific to js, it doesnt involve classes
// prototype refers to objects that other objects can inherit properties and methods from
// Es6 introduced syntactic sugar over js classes 

// Prototypes and prototypical inheritcance
// in js objs have hidden props [[Prototype]]
// this prototype acts as parent form whihc props and methods are inherited
// if a prop is not avalable on object, js automatically retrieves from prototype - prototypal inheritance
let user = {
    name: 'Jonh',
    surname: 'Doe',
    isAdmin: false,

    set fullName(val) {
        [this.name, this.surname] = val.split(' ')
    },

    get fullName() {
        return `${this.name} ${this.surname}`
    },

    login() {
        console.log(`${this.fullName} logged in`);
    },

    logout() {
        console.log(`${this.fullName} logged out`);
    }
}

// admin is-a user
let admin = {
    __proto__: user,
    isAdmin: true,
    manageUsers() {
        console.log(`${this.fullName} is managing users`);
    }
}
let guest = {
    __proto__: user,
    browse() {
        console.log(`${this.fullName} is browsing`);
    }
}

// console.log(guest.fullName);
// guest.fullName = 'Jack Doe';
// console.log(guest.login());

for (let key in guest) {
    // console.log(key);
}
// console.log('-----------------');
// Object.keys / value / entries will not give inherited props
for (let key of Object.keys(guest)) {
    // console.log(key);
}

// Object Set Prototype, this will allow all instances of function to utilize methods in parent objects 
let spoInh = {
    doThis() {
        console.log('Done this')
    }
}

function SpoFunc() {
    Object.setPrototypeOf(this, spoInh)
}

// let spoObjOne = new SpoFunc();
// spoObjOne.doThis();

// Multi Level Inheritance
// my array is an instance of Array
// refers to array base
Array.prototype
// it refers to object base
Object.prototype
// so mA inherits from Array.prototype which inherits from Object.prototype 
let mA = [];

// Property Descriptors
// when enumerable is false this prevents toString method from appearing in the output of for in loop nad methods like Object.keys

let cO = {
    name: 'Child Object'
}
let pO = Object.getPrototypeOf(cO)
let pD = Object.getOwnPropertyDescriptor(pO, 'toString')
// console.log(pD);
/*
{
    value: [Function: toString],
    writable: true,
    enumerable: false,
    configurable: true
    }
    */

// After this the name prop will not appear in for in and Object.keys
// console.log(cO);
Object.defineProperty(cO, 'name', {
    writable: false,
    enumerable: false,
    configurable: true,
})
// console.log(cO);

// Creating Objects and prototypes links
let a = {}
a = new Object(); // same

// Prototype vs Instance Members
// Method Access
// when a method is called on an obj js first checks if the method exists on the obj
// if the method is not found the engine then looks upt the prototype chain of obj
// Memory Usage
// since method defined on the prototype are shared so only one copy of each method in memory

// Instance members are defined within constructor function and unique to each instance
// Prototpe members are defined on constructor prototype and shared across all instaces

// Iterating instance and prototype members
// props defined inside obj are 'own-properties'
// props defined on prototype are 'prototype-properties'

function Tree(name) {
    this.name = name
}

let mt = new Tree('Maple')
Tree.prototype.leaves = function () {
    console.log(`${this.name} tree has many leaves.`)
}

// mt.leaves()
// console.log(mt.hasOwnProperty('leaves'));

// Safer alternative to modifying builtin prototypes is by creating utility functions
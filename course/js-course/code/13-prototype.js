
// Advanced JavaScript Objects

// Object prototypes
// mechanism by which js objects inherit features from one another 
// every object has its own built-in property called prototype
// each prototype has its won prototype, known as prototype chain
// chain ends when prototype gives null
// browsers use  __proto__, but standard is Object.getPrototypeOf()
// when we try to access a property its searched in the object
// if its not present then its searched in the prototypes,
// if still not present then undefined is returned

let result;
let myFirstObj = {
    name: 'First Object',
    message() {
        console.log(this.name)
    }
}

// myFirstObj.message()
result = myFirstObj.toString();
// console.log(result);
result = myFirstObj.__proto__;
// console.log(result);

// Object.prototype // [Object: null prototype] {}
// This is the most basic prototype that all objects have

result = Object.getPrototypeOf(myFirstObj)
// console.log(result);

// The prototype of Object.prototype is null, its end of prototype chain
result = Object.getPrototypeOf(Object.getPrototypeOf(myFirstObj))
// console.log(result);

// Prototype of object is not always Object.prototype
// exmplae below gives Date.prototype .. Object.prototype .. null

result = new Date()
do {
    result = Object.getPrototypeOf(result)
    // console.log(result);
} while (result)

// Shadowing Properties
// if we define a property in object and same property is defined in its protorype
// the new property overrides the default one

result = new Date()
// console.log(result.getDate());
result.getDate = function () {
    return 'Changed'
}
// console.log(result.getDate());

// Setting a prototype
// Object.create() and constructors

// Object.create()
// creates new object allows to specify a prototype

myFirstObj = {
    name: 'Object Prototype',
    message() {
        console.log(this.name)
    }
}

result = Object.create(myFirstObj)
// result.message()

// Constructor
// in js all functions have a proeprty named prototype
// when we call a function as constructor this property is set as prototype of newly constructed object
// its common practice that methods are defined on prototype and properties on constructor
// Own Properties are defined directly on new objects
myFirstObj = {
    message() {
        console.log(this.name)
    }
}
function MyFunction(name){
    this.name = name
}

// assign methods and properties of myFirstObj to protype of MyFunction
// after this, objects created with MyFunction will get its prototype as self prototype
Object.assign(MyFunction.prototype, myFirstObj)
// MyFunction.prototype.message = myFirstObj.message

result = new MyFunction('New Subset')
// result.message()
// console.log(Object.hasOwn(result, "name"));
// console.log(Object.hasOwn(result, "message"));

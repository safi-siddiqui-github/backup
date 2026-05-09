// Objects
// Collection of related data and functionality
// consist of variables and functions
// consist of properties and methods
// name/value pairs
// access properties and methods using dot-notation via its namespace
// an object like this is object-literal
// this keyword refers to the current object the code is being executed in

const home = {
    // properties
    name: 'House',
    window: false,
    // methods
    openWindow: function () {
        this.window = true
    },
    // shorter syntax
    toggleWindow() {
        this.window = !this.window
    },
}

// console.log(home.name);
// console.log(home.window);
// home.toggleWindow()
// console.log(home.window);

// bracket notation
// objects are also called associative arrays
// as we use the name associated with each property value
// but dot notation is preferred
// console.log(home['name']);

// setting / updating members
home.window = true;
// home['doors'] = 5;
// console.log(home.window);
home.doors = 5;
// console.log(home.doors);

// Constructors
// in ordert to create multiple objects with same code we use constructors
// used to define shape of the object

function shapeObject(name) {
    const obj = {}
    obj.name = name;
    obj.setName = function (newName) {
        this.name = newName
    }
    return obj
}

let shapeOne = shapeObject('NameOne')
// console.log(shapeOne.name);
shapeOne.setName('NewNameOne');
// console.log(shapeOne.name);

// Constructor function
// works-fine but a bit long winded: create empty object, initialize it and return it
// a constructor is just a function called using the new keyword
// create new object, bind this to new object
// convention start name with a capital letter

function House(name) {
    this.name = name
    this.setName = function (newName) {
        this.name = newName
    }
}

const houseOne = new House('HouseOne')
// console.log(houseOne.name);
houseOne.setName('NewHouseOne')
// console.log(houseOne.name);

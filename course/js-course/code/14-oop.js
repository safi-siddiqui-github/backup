// Object Oriented Programming
// An object contain data and functions, provides public interface to other code in order to use it
// but maintains its own private and internal state
// Three concepts, Classes and Instances, Inheritance, Polymorphism, Encapsulation 

// Classes and Instances
// When we model a problem in terms of OOP, we create abstract definition 
// representing the types of objects we want to have in our system
// a class is a kind of template for creating objects
// each created object is called as instance 
// instance are created using special functions, constructors
// we pass values to constructors as they define shape of the object 
// the new keyword signals that a constructor is being called
// objects and classes are two seperate constructs
// in js we create objects using a function or object literal

class Person {
    name;
    constructor(name) {
        this.name = name
    }
    greet() {
        console.log(`Welcome ${this.name}`);
    }
}

let tom = new Person('Tom')
// tom.greet()

// Inheritance
// sharing properties and methods between objects

class Student extends Person {
    constructor(name) {
        super(name)
    }
}

let brad = new Student('Brad')
// brad.greet()

// Polymorphism
// when a method has same name but different implementation in different classes
// method in subclass replaces / overrides superclass method

class Learner extends Person {
    subject
    constructor(name, subject) {
        super(name)
        this.subject = subject
    }
    greet() {
        console.log(`${this.name} is learning ${this.subject}`);
    }
}

let jack = new Learner('Jack', 'JavaScript')
// jack.greet()

// Encapsulation
// objects provide interface to code that want to use them
// but maintain their own internal state
// the objects internal state is kept private 
// meaning that it cant be accesed by objects own methods 
// but it cant be accesed from other objects
// making a clear division btw its public interface and private internal state

class Archery extends Person {
    year
    constructor(name, year) {
        super(name)
        this.year = year
    }

    canStudyArchery() {
        return this.year > 20
    }

    message() {
        let a = this.canStudyArchery()
            ? 'Archery is Available'
            : 'Archery is Unavailable'
        return console.log(a);

    }
}

tom = new Archery('Tom', 25)
// tom.message()

// Prototype Chain 
// its behaviour is less like inheritance and more like delegation
// delegation is a pattern where an obj when asked to perfomr a task can perfrom the task
// itslef or ask another object (its delegate) to perform on its behalf
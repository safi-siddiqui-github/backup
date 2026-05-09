// Classes
// it has name property
// constructor to initialise new objects name proeprty
// greet method
// name declaration is optional, the line this.name in constructor will create the name property before initialization
// age is initialized to default value

class Person {
    name;
    age = 20;
    constructor(name) {
        this.name = name
    }
    greet() {
        console.log(`Welcome ${this.name}`);
    }
}

let tom = new Person('Tom')

// Omitting COnstructor
// If we dont want to initialize any proeprty we can omit constructor
// a default constructor is generted

class PersonTwo {
    greet() {
        console.log(`Welcome! Nice to meet you`);
    }
}

// Ineheritance
// extends tells this class inherits form super class
// super calls superclass constructor with parameters
class PersonThree extends Person {
    constructor(name, age) {
        super(name)
        this.age = age
    }
    myAge() {
        console.log(`${this.name} is ${this.age} yrs old`);

    }
}

tom = new PersonThree('Tom Three', 25)
// tom.greet()
// tom.myAge()

// Encapsulation
// in order to make proerties private

class PersonFour extends Person {
    #canTeach
    year
    constructor(name, year) {
        super(name)
        this.#canTeach = year > 25
    }
    canTeachSomething() {
        return this.#canTeach ? console.log('Can Teach') : console.log('Can Not Teach')
    }
    #canTeach2() {
        return this.#canTeach;
    }
    canTeachSomethingTwo() {
        return this.#canTeach2() ? console.log('Can Teach 2') : console.log('Can Not Teach 2')
    }
}

tom = new PersonFour('Tom Four', 15)
// tom.canTeachSomething()
// tom.canTeachSomethingTwo()

// SyntaxError: Private field '#canTeach' must be declared in an enclosing class
// tom.#canTeach
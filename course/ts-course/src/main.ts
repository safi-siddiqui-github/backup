// TypeScript

// Primitive Types

const name: string = "John";
const age: number = 50;
const isHealthy: boolean = true;
// console.log(name, age, isHealthy);

// Arrays
const names: string[] = ["john", "jack"];
const years: number[] = [2025, 2024];
const checks: boolean[] = [true, false];
// console.log(names, years, checks);

// any - special type when we dont want type-checking
// convince ts that this code is okay
// ts compiler defaults to any
let words: any;
words = "Air";
words = 55;

// Functions
// parameter and retunr type annotation
function greet(name: string, date: Date): void {
  console.log(`Welcome ${name}, today is ${date.toDateString()}!`);
}
// greet("Jack", new Date());

// promise
async function wait(): Promise<string> {
  return "Waited";
}
// console.log(wait());

// Object Types
// optional properties use ?
let objOne: { name: string; age?: string } = {
  name: "John",
  age: undefined,
};
// console.log(objOne);

// Union Types
// build new types out of existing types
// it combines mutiple types, referencing as unions member
// ts will only allow operation valid for every member of union
// we have to narrow the union with code
function doThis(text: string | number): void {
  if (typeof text === "string") {
    console.log(text.toUpperCase());
  } else {
    console.log(text * 10);
  }
}
// doThis(55);

function doThis2(text: string | string[]): void {
  if (Array.isArray(text)) {
    console.log(text.join());
  } else {
    console.log(text.toUpperCase());
  }
}

// doThis2(["js", "php"]);
// doThis2("yellow");

// sometimes we have a union where all members have something in common
// we can use same property without narrowing
function sliceThis(text: number[] | string): void {
  console.log(text.slice(3, 10));
}

// sliceThis('colors are bright')
// sliceThis([1,2,3,4,5,6,7,8,9,1,0,1])

// Type aliases
// Name for any type
type Person = {
  name: string;
  age: number;
  greet: () => void;
};
let tom: Person = {
  name: "Tome",
  age: 55,
  greet() {
    console.log(this.name);
  },
};

// Interfaces
// another way to name an object type
interface PersonTwo {
  name: string;
}
let jack: PersonTwo = {
  name: "Jack",
};

// Difference btw interface and types
// types cannot be re-opened to add new properties but interfaces are extendable

interface PersonThree extends Person {
  subject?: string;
}

type PersonFour = Person & {
  subject?: string;
};

// Type assertions
// Forcing a type onto a property
// Like type annotations, type assertions are removed by compiler
let name2: any = "bag" as string;

// Angle bracket syntax
// let name3 = <HTMLBaseElement>document.getElementById("some");

// Literal Types
// Both var and let allows value to change, but const does not
// This is reflected how typescript creates type literals
const name3 = "john";

// By combining literals into unions, we can express much more useful concept
// to accept only certain values
type Colors = "blue" | "black";
let someColor: Colors = "blue";
type Years = 5 | 6 | 7;
let someYear: Years = 6;

// combining literals with non-literals
let someCombintaion: Years | "black" = "black";

// Boolean literal types
let someCondition: boolean | true | false = true;

// Literal Inheritance
// When we initialize an object, ts assumes that properties might change

// Functions
declare function readThis(): void;

// Non-null assertion operator (Postfix !)
// ts havw a special syntax for removing null and undefined from a type without doing any explicit checking
// writing ! after any expression is effectively a type assertion that the value isnt null or undefined

function someAssertion(num?: number) {
  console.log(num!.toFixed(3));
}
// someAssertion(5555);

// Enums
// these are features added to js by ts for describing a value could be one pf a set of possible named constants

// Big int
const bigNumber: BigInt = BigInt(1000);

// Narrowing
// in order to explicitly work a value as type we narrow it
// ts overlays type analysis on js runtime control flow constructs like if/else
// here typeof expression is a type guard
function noarrowThis(text: number | string) {
  if (typeof text === "number") {
    text.toFixed(4);
  } else {
    text.toUpperCase();
  }
}
// Truthiness Narrowing
// arrays are type of objects, as well as null also
// to avoid this we use trithiness narrowing
// 0, NaN, "" (the empty string), 0n (the bigint version of zero), null, undefined - all coerce to false
function truthCheck(text: string | null) {
  if (text && typeof text === "string") {
    text.toLocaleUpperCase();
  }
  if (!text) {
    console.log("text is not there");
  }
}

// Equality narrowing
// when we use ===, ts knw theri types must be equal also
// since string is only common btw both, ts infers it as string
function equalityNarrow(a: string | number, b: string | boolean): void {
  if (a === b) {
    console.log(a.toLowerCase() + b.toLowerCase());
  }
}

// In opertaor narrowing
// an opertaor for checking proeprty in object or its prototype
type Fish = { swim: () => void };
type Bird = { fly: () => void };
function moveAnimal(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

// Instanceof narrowing
// in JavaScript x instanceof Foo checks whether the prototype chain of x contains Foo.prototype
function checkInstance(x: Date | number) {
  if (x instanceof Date) {
    console.log(x.getFullYear());
  }
}

// Type predicates
// pet is fish is our type predicate
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Discriminated Unions
//  we cna use a non-null assertion like a.radius! if we know it has value
// type Shape = {
//   kind: "cirlce" | "square";
//   radius?: number;
//   length?: number;
// };
// this solves to
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

// Never type
// ts uses never type to represent a state that shouldnot exist
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// More on Functions

// Function type expression
// simplest way to describe a function is with a function type expression
// if a parameter isnt typed its implicitly any
function fnOne(a: string): void {
  console.log(a);
}

// Call signature
// If we want to describe something callable, we can write a call signature
type CallSignature = {
  text: string;
  (num: number): boolean;
};
function fnString(fn: CallSignature) {
  return console.log(`${fn.text} ${fn(8)}`);
}
function fnCallbackOne(num: number) {
  return 3 > num;
}
fnCallbackOne.text = "Attached Text";

// fnString(fnCallbackOne)

// Generic Functions
// generics are used when we want to describe a correspondance btw two values
// we do this by declaring a type parameter in the functions signatature
// It’s ideal for data structures to work this way so that they’re re-usable across different data types.
function fnThree<Type>(a: Type[]): Type | undefined {
  return a[0];
}

// now when we call it a more spicific type comes out
// fnThree(['black']) // strings
// fnThree([]) // undefined

// Inference
// in above example the type was inferred - chosen automatically
// we cna use multiple type parameters
function fnFour<Input, Output>(a: Input, b: Output): undefined | void {
  if (typeof a === "number" || b === 5) {
    return;
  }
  console.log(a);
}
// fnFour('someString', 78)

// Constraints
// generic functions can relate to any type
// but to limit their type
function fnFive<Type extends { length: number }>(a: Type) {
  if (a.length > Math.random()) {
    return false;
  }
}

// Specifying type arguments
function fnSix<Type>(a: Type, b: Type): void {
  // console.log(a.slice(b));
}
// fnSix<string | number>("Welcome", 3);

// Optional Parameters
// we can model optional arguments with ?
// it will default to undefined | type
function fnSeven(a?: string) {
  return a;
}

// Other types
// void - return;
// object - non-primitive values != string, number, bigint, boolean, symbol, null, or undefined
// unknown - safer then any
// never - () => throw new Error - fns that never return a value
// Function

// Rest parameters and arguments
// we use optional parameters and overloads to accepts a variaety of fixed arguments
// in order to accept unbounded numb rof arguments
function fnEight(a: string, ...b: number[]) {}
// fnEight('black', 1,2,3,4)

// Parameter Destructuring
function fnNine({ a, b, c }: { a: string; b: number; c: boolean }) {
  return a + b + c;
}

// Object Types
// readonly cant me modified
// ts has excess property checks
type Human = {
  name: string;
  age?: number;
  readonly isAlive: boolean;
};
let objTwo = {
  name: "Object One",
  isAlive: true,
} as Human;

// ts allows extension(extend) and intersection(&) to combine object types
// if multiple interface are defined with same name, ts will merge them
// if properties are not compatible ts raises an error
//  same for intersection

// Tuple Types
// tuple is another sort of array that exactly how many elements it has and what type they have

// Classes
class Point {
  x;
  y;
  #length: number;
  _square: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.#length = x * y;
    this._square = this.#length ** 2;
  }

  get length() {
    return this.#length;
  }

  set square(num: number) {
    this.#length = num;
  }
}

// Class Heritage
// implements dont create the properties and methods itself
type PointTwo = {
  x: number;
  square: () => number;
};

class PointTwoCL implements PointTwo {
  x;
  constructor(x: number) {
    this.x = x;
  }
  square() {
    return this.x ** 2;
  }
}

// Type only field declrations
// redeclre a more appropriate type for inherited field
type decType = {
  name: string;
};
type decTypeAdd = decType & {
  age: number;
};

class decClass {
  bio: decType;
  constructor(bio: decType) {
    this.bio = bio;
  }
}

class decClassAdd extends decClass {
  declare bio: decTypeAdd;
  constructor(bio: decTypeAdd) {
    super(bio);
  }
}

// Member visibility
// by default all class member are public
// protected members are only visible to subclasses
// private members are only visible to its class
class HumanTwo {
  public greet() {
    console.log("welcome");
  }
  protected meet() {
    console.log("Nice");
  }
  private share() {
    console.log("Share");
  }
}

// Generic Classes
// classes like interfaces can be generic, when a generic class is instantiated with new
// its type parameter are infered the smae way as in function
class Box<Type> {
  side: Type;
  constructor(side: Type) {
    this.side = side;
  }
}
let boxOne = new Box("black");

// This type
// in classes special type called this refers dynaically to the type of current class

// Parameter Properties
class Boxes {
  // constructor(public side: number) {}
}

// Abstract Classes and members
// an abstract method or field is one that hasnot implemented yet
// an abstract must not be instantiated and must be used as base class
abstract class Triangle {
  abstract getLength() :number
}
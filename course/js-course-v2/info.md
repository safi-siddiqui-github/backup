# JavaScript for Beginners to Professionals

## Includes Budget APP Project

### Javascript is everywhere

- In essence, JavaScript is a powerful and essential language for modern web development and has expanded its reach far beyond the browser. It's a key skill for anyone wanting to build interactive and dynamic web applications or explore other areas of software development.

#### Uses:

1. Build Websites & Web Apps

   - HTML
   - CSS
   - React
   - Angular
   - Vue

2. Mobile Apps:

   - React Native (Facebook)
   - Lynx (Tiktok)

3. Desktop Apps:

   - Electron

4. Server Side:

   - Node JS

5. Games / AI & VR

### Versions:

#### What is Javascript (ES6+) ?

- Technical specification is called ECMAScript (ES) maintained by Ecma intrenational
- Every year a new edition is released.
- In 2015, the 6th edition (ES6) was released: **_Huge Update_**

ES5 Syntax:

    var a = 5; (function scoped)

ES6 Syntax:

    let a = 6; (blocked scope)

    const a = 6;

### Example [function vs blocked]

#### Function Scope: When a variable is declared inside a function, it is only accessible within that function and cannot be used outside that function.

#### Block Scope: A variable when declared inside the if or switch conditions or inside for or while loops, are accessible within that particular condition or loop. To be consise the variables declared inside the curly braces are called as within block scope.

    function runThis() {
        if (true) {
            var a = 'JS';
            let b = 'PHP';
            const c = 'SQL';

            console.log(a);
            console.log(b);
            console.log(c);
        }

        console.log('Outside If Statement');
        console.log(a);
        console.log(b);
        console.log(c);

    }

    runThis();

---

#### CMD

    node function-block-scope.js

---

    JS
    PHP
    SQL
    Outside If Statement
    JS

    function-block-scope.js:14
    console.log(b);
                ^
    ReferenceError: b is not defined

### IDE (Integrated Development Environment)

- VS Code
- PHPStorm
- Android Studio
- Cursor

### Introduction Completed

# 10 Important Concepts

### Comments

Comments are used to describe a piece of code

    //
    /* */

### Variables

Variables are used to store data in our app.

    var balance = 5000;
    let budget = 5000;
    const amount = 2000;

We can override varaibles defined using var and let, but const doesnot allow to override

    budget = 7000;
    amount = 50

    2-concepts.js:12
    totalAmount = 5;
                ^
    TypeError: Assignment to constant variable.

### Data types and structures

Data types are used to classify data in computer programming, telling the compiler or interpreter how the data should be interpreted and used.

    let name = 5000;
    let budget = 5000;
    const totalAmount = 2000;
    // camelCase - convention / common pattern

# Budget APP

### Index.html

Baics elements html use:

- html
- head
- meta
- body
- div
- p
- h2

### Tailwind CSS

- Basic styling

### Best Practises

- If the defer attribute is set, it specifies that the script is downloaded in parallel to parsing the page, and executed after the page has finished parsing.
- It tells browser dont block parsing the rest of the page, dowload this script and onve the html is completely parsed

---

    <script src="./app.js" defer></script>

### Parsing:

- Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run, for example the JavaScript engine inside browsers. The browser parses HTML into a DOM tree.
- Preassure cooker cooks/parses vegetables, pulses into food

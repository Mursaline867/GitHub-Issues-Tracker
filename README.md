### 1) What is the difference between var, let, and const?

`var` is the old way to declare variables in JavaScript. It can be redeclared and it does not follow block scope, so it may create confusing behavior inside loops or conditions. `let` is block-scoped and can be reassigned, which makes it safer for values that need to change. `const` is also block-scoped, but it cannot be reassigned after declaration. I usually use `const` by default and `let` only when a value really needs to change.

### 2) What is the spread operator (...)?

The spread operator is a short way to copy or expand values from arrays, objects, or function arguments. For example, it can merge two arrays into one, copy an object without changing the original, or pass array items into a function as separate arguments. It helps write cleaner code and is very useful when working with immutable data.

### 3) What is the difference between map(), filter(), and forEach()?

`map()` creates a new array by changing every item from the original array. `filter()` creates a new array too, but it only keeps the items that match a condition. `forEach()` is different because it just runs a function on every item and does not return a new array for reuse. So if I need a transformed array I use `map()`, if I need a smaller array I use `filter()`, and if I just want to do something with each item I use `forEach()`.

### 4) What is an arrow function?

An arrow function is a shorter way to write a function in JavaScript using the `=>` syntax. It is often used for small callbacks and makes code look cleaner. One important thing is that arrow functions handle `this` differently from regular functions, so they are helpful when I want to keep the surrounding context.

### 5) What are template literals?

Template literals are strings written with backticks instead of quotes. They let us insert variables directly inside a string using `${}`. They also make it easier to write multi-line strings without adding special characters. This makes dynamic text much easier to read and manage.
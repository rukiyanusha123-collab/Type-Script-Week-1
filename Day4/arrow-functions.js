"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greet = (name) => {
    return `Hello, ${name}!`;
};
console.log(greet("Rukiya"));
const add = (a, b) => {
    return a + b;
};
console.log(add(10, 20));
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => {
    return num * 2;
});
console.log(doubled);

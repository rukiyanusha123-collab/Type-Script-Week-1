"use strict";
let age = 21;
let username = "Rukiya";
let isLoggedIn = true;
let emptyValue = null;
let notAssigned = undefined;
let data = "Hello";
data = 100;
data = true;
let value = "TypeScript";
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
function throwError(message) {
    throw new Error(message);
}
console.log(age);
console.log(username);
console.log(isLoggedIn);
console.log(emptyValue);
console.log(notAssigned);
console.log(data);

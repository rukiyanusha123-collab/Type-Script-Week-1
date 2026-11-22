"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identity(value) {
    return value;
}
function getFirstItem(items) {
    return items[0];
}
const stringValue = identity("Hello TypeScript");
const numberValue = identity(100);
const booleanValue = identity(true);
const firstNumber = getFirstItem([10, 20, 30]);
const firstName = getFirstItem(["Amina", "Rukiya", "Sara"]);
const numberBox = {
    value: 500
};
const stringBox = {
    value: "Welcome"
};
const userResponse = {
    success: true,
    data: "User data received"
};
console.log(stringValue);
console.log(numberValue);
console.log(booleanValue);
console.log(firstNumber);
console.log(firstName);
console.log(numberBox);
console.log(stringBox);
console.log(userResponse);

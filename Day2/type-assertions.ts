
 // 1. Unknown value
let userInput: unknown = "hello typescript";

// 2. Type assertion
let message = userInput as string;

console.log(message.toUpperCase());

// 3. Number assertion
let someValue: unknown = 100;

let numberValue = someValue as number;

console.log(numberValue.toFixed(2));

// 4. Assertion with another string
let anotherValue: unknown = "Rukiya";

let name = anotherValue as string;

console.log(name.length);

export {};

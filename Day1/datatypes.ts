
let age: number = 21;
let username: string = "Rukiya";
let isLoggedIn: boolean = true;

let emptyValue: null = null;
let notAssigned: undefined = undefined;

let data: any = "Hello";
data = 100;
data = true;

let value: unknown = "TypeScript";

if (typeof value === "string") {
    console.log(value.toUpperCase());
}

function throwError(message: string): never {
    throw new Error(message);
}

console.log(age);
console.log(username);
console.log(isLoggedIn);
console.log(emptyValue);
console.log(notAssigned);
console.log(data);

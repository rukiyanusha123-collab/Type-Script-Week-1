
 // 1. Simple function
function greet(name: string): string {
    return `Hello ${name}`;
}

// 2. Add two numbers
function add(a: number, b: number): number {
    return a + b;
}

// 3. Function type
let multiply: (a: number, b: number) => number;

multiply = (a, b) => a * b;

// 4. Optional parameter
function studentDetails(name: string, age?: number): void {
    console.log("Name:", name);

    if (age !== undefined) {
        console.log("Age:", age);
    }
}

// 5. Default parameter
function calculatePrice(price: number, quantity: number = 1): number {
    return price * quantity;
}

// 6. Rest parameter
function findTotal(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// Function calls
console.log(greet("Rukiya"));
console.log(add(10, 20));
console.log(multiply(5, 4))

studentDetails("Rukiya");
studentDetails("Rukiya", 21);

console.log(calculatePrice(500));
console.log(calculatePrice(500, 3));

console.log(findTotal(10, 20, 30, 40));

export {};

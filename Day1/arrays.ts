
let numbers: number[] = [10, 20, 30, 40, 50];
let fruits: string[] = ["Apple", "Orange", "Mango"];
let prices: number[] = [100, 200, 300];

// Add value
numbers.push(60);
fruits.push("Grapes");

// Map
let doubled = numbers.map((num) => num * 2);

// Filter
let filtered = numbers.filter((num) => num > 20)

// Reduce
let total = prices.reduce((sum, price) => sum + price, 0);

console.log(numbers);
console.log(fruits);
console.log(doubled);
console.log(filtered);
console.log(total);

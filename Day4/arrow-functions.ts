const greet = (name: string): string => {
    return `Hello, ${name}!`;
};

console.log(greet("Rukiya"));

const add = (a: number, b: number): number => {
    return a + b;
};

console.log(add(10, 20));

const numbers: number[] = [1, 2, 3, 4, 5];

const doubled: number[] = numbers.map((num: number): number => {
    return num * 2;
});

console.log(doubled);

export {};
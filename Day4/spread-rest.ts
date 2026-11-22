// Spread operator with arrays
const frontendSkills: string[] = ["HTML", "CSS", "React"];

const backendSkills: string[] = ["Node.js", "Express", "MongoDB"];

const allSkills: string[] = [...frontendSkills, ...backendSkills];

console.log(allSkills);

// Rest operator
const total = (...numbers: number[]): number => {
    return numbers.reduce((sum, num) => sum + num, 0);
};

console.log(total(10, 20, 30, 40));

// Spread operator with objects
const originalUser = {
    name: "Rukiya",
    role: "Developer",
};

const updatedUser = {
    ...originalUser,
    role: "Full Stack Developer",
};

console.log(updatedUser);

export {};
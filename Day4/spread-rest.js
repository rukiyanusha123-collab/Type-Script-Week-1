"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Spread operator with arrays
const frontendSkills = ["HTML", "CSS", "React"];
const backendSkills = ["Node.js", "Express", "MongoDB"];
const allSkills = [...frontendSkills, ...backendSkills];
console.log(allSkills);
// Rest operator
const total = (...numbers) => {
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

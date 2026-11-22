"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const math_1 = require("./math");
const student = new classes_1.StudentManager(101, "Rukiya", "rukiya@example.com", "Full Stack Development");
const studentInfo = {
    id: 101,
    name: "Rukiya",
    status: "Active",
};
console.log("----- Student Details -----");
console.log(student.getDetails());
console.log(studentInfo);
console.log("----- Math Operations -----");
console.log("Addition:", (0, math_1.add)(10, 5));
console.log("Subtraction:", (0, math_1.subtract)(10, 5));
console.log("Multiplication:", (0, math_1.multiply)(10, 5));
console.log("Division:", (0, math_1.divide)(10, 5));

import { StudentManager } from "./classes";
import { add, subtract, multiply, divide } from "./math";
import { StudentDetails } from "./types";

const student = new StudentManager(
    101,
    "Rukiya",
    "rukiya@example.com",
    "Full Stack Development"
);

const studentInfo: StudentDetails = {
    id: 101,
    name: "Rukiya",
    status: "Active",
};

console.log("----- Student Details -----");
console.log(student.getDetails());
console.log(studentInfo);

console.log("----- Math Operations -----");
console.log("Addition:", add(10, 5));
console.log("Subtraction:", subtract(10, 5));
console.log("Multiplication:", multiply(10, 5));
console.log("Division:", divide(10, 5));
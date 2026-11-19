"use strict";
// Type Inference
let course = "Full Stack";
let mark = 90;
let isPassed = true;
// Type Annotation
let studentName = "Rukiya";
let studentAge = 21;
let passed = true;
// Inferred types
course = "TypeScript";
// course = 100; // Error
// Annotated types
studentAge = 22;
// studentAge = "twenty"; // Error
console.log(course);
console.log(mark);
console.log(isPassed);
console.log(studentName);
console.log(studentAge);
console.log(passed);

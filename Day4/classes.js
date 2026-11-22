"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentManager = void 0;
class StudentManager {
    constructor(id, name, email, course) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
    }
    getDetails() {
        return `${this.name} is learning ${this.course}`;
    }
}
exports.StudentManager = StudentManager;
const student1 = new StudentManager(1, "Rukiya", "rukiya@example.com", "TypeScript");
console.log(student1.getDetails());

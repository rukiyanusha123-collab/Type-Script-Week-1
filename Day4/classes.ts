import { Student } from "./interfaces";

export class StudentManager implements Student {
    id: number;
    name: string;
    email: string;
    course: string;

    constructor(id: number, name: string, email: string, course: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
    }

    getDetails(): string {
        return `${this.name} is learning ${this.course}`;
    }
}

const student1 = new StudentManager(
    1,
    "Rukiya",
    "rukiya@example.com",
    "TypeScript"
);

console.log(student1.getDetails());
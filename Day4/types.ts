export type StudentStatus = "Active" | "Completed" | "Pending";

export type ID = number | string;

export type StudentDetails = {
    id: ID;
    name: string;
    status: StudentStatus;
};

const student: StudentDetails = {
    id: 101,
    name: "Rukiya",
    status: "Active",
};

console.log(student);

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  readonly role: string;
}

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  salary: number;
}

const user1: User = {
  id: 1,
  name: "Rukiya",
  email: "rukiya@gmail.com",
  phone: "9876543210",
  role: "Developer"
};

const employee1: Employee = {
  name: "Amina",
  age: 25,
  employeeId: 101,
  salary: 30000
};

function displayUser(user: User): void {
  console.log("User Name:", user.name);
  console.log("Email:", user.email);
  console.log("Role:", user.role);
}

function displayEmployee(employee: Employee): void {
  console.log("Employee Name:", employee.name);
  console.log("Employee ID:", employee.employeeId);
  console.log("Salary:", employee.salary);
}

displayUser(user1);
displayEmployee(employee1);

export {};

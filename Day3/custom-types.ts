
type ID = number | string;

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type PaymentMethod = "COD" | "Online";

type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type Staff = Person & Employee;

type Calculator = (a: number, b: number) => number;

const userId: ID = 101;
const orderStatus: OrderStatus = "Processing";
const paymentMethod: PaymentMethod = "COD";

const staff: Staff = {
  name: "Amina",
  age: 25,
  employeeId: 101,
  department: "Development"
};

const add: Calculator = (a, b) => a + b;

console.log("User ID:", userId);
console.log("Order Status:", orderStatus);
console.log("Payment:", paymentMethod);
console.log("Staff:", staff);
console.log("Addition:", add(10, 20));

export {};


interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type PaymentMethod = "COD" | "Online";

interface Order {
  id: number;
  userId: number;
  products: Product[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const customer: User = {
  id: 1,
  name: "Rukiya",
  email: "rukiya@gmail.com",
  role: "customer"
};

const product1: Product = {
  id: 101,
  name: "Baby Dress",
  price: 599,
  stock: 10,
  category: "Clothing"
};

const product2: Product = {
  id: 102,
  name: "Baby Shoes",
  price: 799,
  stock: 5,
  category: "Footwear"
};

const order: Order = {
  id: 5001,
  userId: customer.id,
  products: [product1, product2],
  totalAmount: product1.price + product2.price,
  status: "Pending",
  paymentMethod: "COD"
};

const productResponse: ApiResponse<Product[]> = {
  success: true,
  message: "Products fetched successfully",
  data: [product1, product2]
};

const orderResponse: ApiResponse<Order> = {
  success: true,
  message: "Order created successfully",
  data: order
};

function displayOrder(order: Order): void {
  console.log("Order ID:", order.id);
  console.log("Customer ID:", order.userId);
  console.log("Total:", order.totalAmount);
  console.log("Status:", order.status);
  console.log("Payment:", order.paymentMethod);
}

displayOrder(order);

console.log(productResponse);
console.log(orderResponse);

export {};

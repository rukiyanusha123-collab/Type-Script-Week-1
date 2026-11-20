
 // 1. Union type
type ID = string | number;

let userId: ID = 101;
userId = "USR101";

console.log("User ID:", userId);

// 2. Type alias
type Product = {
    name: string;
    price: number;
};

// 3. Another type
type Stock = {
    quantity: number;
    inStock: boolean;
};

// 4. Intersection type
type ProductDetails = Product & Stock;

// 5. Object using intersection
let item: ProductDetails = {
    name: "Baby Shoes",
    price: 499,
    quantity: 10,
    inStock: true
};

console.log(item);

// 6. Union literal type
type OrderStatus = "pending" | "shipped" | "delivered";

let status: OrderStatus = "pending";

status = "shipped";

console.log("Order Status:", status);

export {};

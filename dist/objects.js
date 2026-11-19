"use strict";
let product = {
    id: 1,
    name: "Baby Shoes",
    price: 499,
    isAvailable: true,
    description: "Soft baby shoes",
    category: {
        name: "Footwear"
    }
};
// Access properties
console.log(product.name);
console.log(product.price);
console.log(product.category.name);
// Update
product.name = "Baby Sneakers";
product.price = 599;
// Optional property
product.description = "Comfortable baby sneakers";
// product.id = 2; // Error because readonly
console.log(product);

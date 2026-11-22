
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

function updateObject<T extends object>(original: T, updates: Partial<T>): T {
  return {
    ...original,
    ...updates
  };
}

function filterItems<T>(items: T[], callback: (item: T) => boolean): T[] {
  return items.filter(callback);
}

interface Page<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

function paginate<T>(items: T[], page: number, limit: number): Page<T> {
  const startIndex = (page - 1) * limit;
  const pageData = items.slice(startIndex, startIndex + limit);

  return {
    data: pageData,
    total: items.length,
    page,
    limit
  };
}

const numbers = [10, 20, 30, 40, 50];

const names = ["Amina", "Rukiya", "Sara"];

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: "Baby Dress", price: 599, stock: 10 },
  { id: 2, name: "Baby Shoes", price: 799, stock: 5 },
  { id: 3, name: "Baby Toy", price: 299, stock: 20 }
];

const firstNumber = getFirst(numbers);
const firstName = getFirst(names);

const productName = getProperty(products[0], "name");
const productPrice = getProperty(products[0], "price");

const updatedProduct = updateObject(products[0], {
  price: 699,
  stock: 15
});

const affordableProducts = filterItems(products, (product) => {
  return product.price < 600;
});

const productPage = paginate(products, 1, 2);

console.log("First Number:", firstNumber);
console.log("First Name:", firstName);
console.log("Product Name:", productName);
console.log("Product Price:", productPrice);
console.log("Updated Product:", updatedProduct);
console.log("Affordable Products:", affordableProducts);
console.log("Paginated Products:", productPage);

export {};


interface HasLength {
  length: number;
}

function printLength<T extends HasLength>(value: T): number {
  console.log("Length:", value.length);
  return value.length;
}

interface HasId {
  id: number;
}

function displayId<T extends HasId>(item: T): number {
  console.log("ID:", item.id);
  return item.id;
}

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const text = "TypeScript";
const numbers = [10, 20, 30];

const user = {
  id: 1,
  name: "Rukiya",
  age: 22
};

printLength(text);
printLength(numbers);

displayId(user);

console.log(getProperty(user, "name"));
console.log(getProperty(user, "age"));
console.log(getProperty(user, "id"));

export {};


function identity<T>(value: T): T {
  return value;
}

function getFirstItem<T>(items: T[]): T {
  return items[0];
}

interface Box<T> {
  value: T;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const stringValue = identity<string>("Hello TypeScript");
const numberValue = identity<number>(100);
const booleanValue = identity<boolean>(true);

const firstNumber = getFirstItem<number>([10, 20, 30]);
const firstName = getFirstItem<string>(["Amina", "Rukiya", "Sara"]);

const numberBox: Box<number> = {
  value: 500
};

const stringBox: Box<string> = {
  value: "Welcome"
};

const userResponse: ApiResponse<string> = {
  success: true,
  data: "User data received"
};

console.log(stringValue);
console.log(numberValue);
console.log(booleanValue);
console.log(firstNumber);
console.log(firstName);
console.log(numberBox);
console.log(stringBox);
console.log(userResponse);

export {};

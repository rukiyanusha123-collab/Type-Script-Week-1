
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
}

type UpdateUser = Partial<User>;

type CompleteUser = Required<User>;

type PublicUser = Pick<User, "id" | "name" | "email">;

type SafeUser = Omit<User, "password">;

type ReadonlyUser = Readonly<User>;

type RolePermissions = Record<"admin" | "user" | "guest", string>;

const updateUser: UpdateUser = {
  name: "Amina"
};

const completeUser: CompleteUser = {
  id: 1,
  name: "Rukiya",
  email: "rukiya@gmail.com",
  password: "123456",
  age: 22
};

const publicUser: PublicUser = {
  id: 1,
  name: "Rukiya",
  email: "rukiya@gmail.com"
};

const safeUser: SafeUser = {
  id: 2,
  name: "Amina",
  email: "amina@gmail.com",
  age: 25
};

const readonlyUser: ReadonlyUser = {
  id: 3,
  name: "Sara",
  email: "sara@gmail.com",
  password: "abc123"
};

const permissions: RolePermissions = {
  admin: "Full access",
  user: "Limited access",
  guest: "Read only"
};

console.log(updateUser);
console.log(completeUser);
console.log(publicUser);
console.log(safeUser);
console.log(readonlyUser);
console.log(permissions);

export {};

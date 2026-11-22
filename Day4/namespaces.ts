namespace UserManagement {
    export interface User {
        id: number;
        name: string;
    }

    export function greetUser(user: User): string {
        return `Welcome ${user.name}!`;
    }
}

const user: UserManagement.User = {
    id: 1,
    name: "Rukiya",
};

console.log(UserManagement.greetUser(user));

export {};  
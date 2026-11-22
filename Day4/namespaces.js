"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserManagement;
(function (UserManagement) {
    function greetUser(user) {
        return `Welcome ${user.name}!`;
    }
    UserManagement.greetUser = greetUser;
})(UserManagement || (UserManagement = {}));
const user = {
    id: 1,
    name: "Rukiya",
};
console.log(UserManagement.greetUser(user));

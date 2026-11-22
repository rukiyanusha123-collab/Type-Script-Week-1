"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BankAccount {
    constructor(accountHolder, balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.bankName = "ABC Bank";
    }
    deposit(amount) {
        this.balance += amount;
    }
    getBalance() {
        return this.balance;
    }
}
const account = new BankAccount("Rukiya", 1000);
account.deposit(500);
console.log(account.accountHolder);
console.log(account.getBalance());

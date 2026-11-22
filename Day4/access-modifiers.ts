class BankAccount {
    public accountHolder: string;
    private balance: number;
    protected bankName: string;

    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.bankName = "ABC Bank";
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount("Rukiya", 1000);

account.deposit(500);

console.log(account.accountHolder);
console.log(account.getBalance());

// console.log(account.balance); // Error: private property

export {};
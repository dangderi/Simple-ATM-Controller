class Account {
    private amount: number;
    private name: string;
    private pin: number;

    constructor(amount: number, name: string, pin: number) {
        this.amount = amount;
        this.name = name;
        this.pin = pin;
    }

    public showBalance() {
        console.log(`Your current balance is $${this.amount}`);
    }
    public deposit(amount: number) {
        this.amount += amount;
    }
    public withdraw() {

    }
}

export default Account;

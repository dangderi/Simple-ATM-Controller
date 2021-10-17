import readline = require("readline");

class ATM {
    public run = async ( account: any ) => {
        const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
        });
        let tries = 2;
        const questionOne = () => {
            return new Promise((resolve, reject) => {
                rl.question("Welcome! Please enter your 4 digit PIN number.\n -> ", async (pin) => {
                    while (Number(pin) !== account.pin) {
                        if (tries === 0) {
                            console.log("You have exceeded the maximum number of PIN numbers. Please contact our bank administrator.");
                            reject();
                            break;
                        }
                        await new Promise((resolve) => {
                            rl.question(`You have entered the wrong PIN number. You have ${tries} attempts left \n
                             Try your PIN number again.\n -> `, (newPin) => {
                                tries--;
                                pin = newPin;
                                resolve();
                            });
                        });
                    }
                    resolve();
                });
            });
        };
        const questionTwo = () => {
            return new Promise((resolve) => {
                rl.question("Please select your account. \n For Cheque account, press 1. \n For Savings account, press 2.\n To quit, press 3.\n -> ", (accountType) => {
                    if ( accountType === "3" ) {
                        console.log("Transaction cancelled. See you next time!");
                        rl.close();
                    }
                    else if ( accountType === "1" ) {
                        resolve("cheque");
                    }
                    else if ( accountType === "2" ) {
                        resolve("savings");
                    }
                    else {
                        rl.close();
                    }
                });
            });
        };

        const questionThree = (accountType: string) => {
            return new Promise(async (resolve) => {
                console.log(`\nYou are in ${accountType} account.\n`);
                rl.question("\nTo show balance, press 1.\nTo make a deposit, press 2.\nTo make a withdrawal, press 3.\nTo exit, press 4.\n", async (transaction)=> {
                    await new Promise(async (resolve, reject) => {
                        while (1) {
                            await new Promise(async (resolve)=> {
                                if (transaction === "1") {
                                    account.showBalance();
                                    resolve();
                                }
                                else if (transaction === "2") {
                                    await rl.question("Please enter your deposit amount: ", async (amount) => {
                                        if (Number(amount) < 0) {
                                            console.log("You can't enter negative value.");
                                            reject();
                                        }
                                        await account.deposit(amount);
                                        rl.question("\nWould you like to do any other transaction? \nTo continue, press 1.\nTo exit, press 2.\n", (answer)=> {
                                            new Promise((resolve, reject) => {
                                                if (answer === "2") {
                                                    rl.close();
                                                }
                                                resolve();
                                            });
                                        });
                                    });
                                }
                                else if (transaction === "3") {
                                    account.withdraw();
                                }
                            });
                        }
                    });
                });
            });
        };

        try {
            await questionOne().then( () => {
                questionTwo().then(transaction => {
                    questionThree(transaction as string);
                });
            });
        } catch {
            console.log("Transaction cancelled");
            rl.close();
        }

        rl.on("close", function() {
            console.log("\nThank you for banking with us.");
            process.exit(0);
        });

        rl.on("line", (input) => {
            console.log(`Received: ${input}`);
        });
    }
}

export default ATM;

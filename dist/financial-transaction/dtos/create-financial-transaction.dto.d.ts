import { Application } from "src/application/models";
import { FinancialTransactionType, PaymentStrategyType, PaymentMoneyCode } from "src/financial-payment/enum";
import { Wallet } from "src/wallet/models";
import { FinancialTransactionState } from "../enum";
export declare class CreateFinancialTransactionDTO {
    amount: number;
    type: FinancialTransactionType;
    paymentMode: PaymentStrategyType;
    state: FinancialTransactionState;
    moneyCode: PaymentMoneyCode;
    userRef: any;
    application: Application;
    wallet: Wallet;
}

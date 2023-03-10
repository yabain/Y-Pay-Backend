import { FinancialTransaction } from "src/financial-transaction/models";
export interface PaymentMethodStrategy {
    buy(financialTransaction: FinancialTransaction): any;
    check(financialTransaction: FinancialTransaction): any;
    cancel(financialTransaction: FinancialTransaction): any;
    withdrawal(financialTransaction: FinancialTransaction): any;
    checkWithdrawal(financialTransaction: FinancialTransaction): any;
}

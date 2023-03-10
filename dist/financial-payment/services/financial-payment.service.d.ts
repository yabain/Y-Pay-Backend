import { FinancialTransaction } from "src/financial-transaction/models";
import { PaymentBuilder } from "../builder/payment.builder";
import { PaymentStrategyType } from "../enum";
export declare class FinancialPaymentService {
    private paymentBuilder;
    constructor(paymentBuilder: PaymentBuilder);
    makePaiement(financialTransaction: FinancialTransaction): Promise<any>;
    checkPaiement(financialTransaction: FinancialTransaction): Promise<any>;
    cancelPaiement(financialTransaction: FinancialTransaction, paiementMethod: PaymentStrategyType): Promise<any>;
}

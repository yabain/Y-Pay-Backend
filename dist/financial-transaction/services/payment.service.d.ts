import { FinancialPaymentService } from "src/financial-payment/services";
import { CreateFinancialTransactionDTO } from "../dtos";
import { FinancialTransactionService } from "./financial-transaction.service";
import mongoose from "mongoose";
import { WalletService } from "src/wallet/services";
export declare class PaymentService {
    private paymentService;
    private walletService;
    private financialTransactionService;
    private readonly connection;
    constructor(paymentService: FinancialPaymentService, walletService: WalletService, financialTransactionService: FinancialTransactionService, connection: mongoose.Connection);
    makePayment(createFinancialTransactionDTO: CreateFinancialTransactionDTO, appID: any): Promise<any>;
    checkPayment(financialTransactionRef: any): Promise<any>;
    updateWallet(financialTransaction: any, transaction?: any): Promise<void>;
}

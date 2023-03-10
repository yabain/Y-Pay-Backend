import mongoose, { Document } from "mongoose";
import { FinancialTransactionErrorType, FinancialTransactionState } from "../enum";
import { Application } from "../../application/models";
import { Wallet } from "../../wallet/models";
import { FinancialTransactionType, PaymentStrategyType } from "src/financial-payment/enum";
export declare type FinancialTransactionDocument = FinancialTransaction & Document;
export declare class FinancialTransaction {
    state: FinancialTransactionState;
    startDate: string;
    endDate: String;
    amount: number;
    type: FinancialTransactionType;
    ref: string;
    error: FinancialTransactionErrorType;
    paymentMode: PaymentStrategyType;
    application: Application;
    moneyCode: string;
    userRef: Record<string, any>;
    wallet: Wallet;
    createdAt: Date;
}
export declare const FinancialTransactionSchema: mongoose.Schema<FinancialTransaction, mongoose.Model<FinancialTransaction, any, any, any, any>, {}, {}, {}, {}, "type", FinancialTransaction>;

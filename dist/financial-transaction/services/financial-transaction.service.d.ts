import mongoose, { Model } from "mongoose";
import { ApplicationService } from "src/application/services";
import { WalletService } from "src/wallet/services";
import { CreateFinancialTransactionDTO } from "../dtos";
import { FinancialTransaction, FinancialTransactionDocument } from "../models";
export declare class FinancialTransactionService {
    private financialTransactionModel;
    private readonly connection;
    private applicationService;
    private walletService;
    constructor(financialTransactionModel: Model<FinancialTransactionDocument>, connection: mongoose.Connection, applicationService: ApplicationService, walletService: WalletService);
    create(createFinancialTransactionDTO: CreateFinancialTransactionDTO, appClientID: any, session: any): Promise<FinancialTransaction & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<FinancialTransactionDocument[]>;
    findByField(userObj: Record<string, any>): Promise<FinancialTransactionDocument[]>;
    findOneByField(userObj: Record<string, any>): Promise<FinancialTransactionDocument>;
    update(filter: Record<string, any>, toUpdate: Record<string, any>, session?: any): Promise<FinancialTransaction & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}

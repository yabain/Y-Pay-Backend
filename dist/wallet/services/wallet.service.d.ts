import mongoose, { Model } from "mongoose";
import { WalletDocument } from "../models";
import { Application } from "src/application/models";
export declare class WalletService {
    private walletModel;
    constructor(walletModel: Model<WalletDocument>);
    getInstance(jsonObj: any): import("../models").Wallet & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    };
    update(filter: Record<string, any>, toUpdate: Record<string, any>, session?: any): Promise<import("../models").Wallet & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    create(user: any, application: Application, transaction?: mongoose.ClientSession | null): Promise<import("../models").Wallet & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findOneByField(walletObj: Record<string, any>): Promise<WalletDocument>;
    increaseWallet(walletID: any, amount: number, session?: any): Promise<WalletDocument>;
    decreaseWallet(walletID: any, amount: number, session?: any): Promise<WalletDocument>;
    findByField(walletObj: Record<string, any>): Promise<WalletDocument[]>;
    findListWalletByOwner(userID: string): Promise<WalletDocument[]>;
}

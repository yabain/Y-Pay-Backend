import mongoose, { Document } from "mongoose";
import { Application } from "src/application/models";
import { User } from "src/user/models";
export declare type WalletDocument = Wallet & Document;
export declare class Wallet {
    amount: number;
    owner: User;
    app: Application;
    createdAt: Date;
    isDeleted: false;
}
export declare const WalletSchema: mongoose.Schema<Wallet, mongoose.Model<Wallet, any, any, any, any>, {}, {}, {}, {}, "type", Wallet>;

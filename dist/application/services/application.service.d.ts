import mongoose, { Model } from "mongoose";
import { UsersService } from "src/user/services";
import { Wallet } from "src/wallet/models";
import { WalletService } from "src/wallet/services";
import { CreateAppDTO } from "../dtos";
import { Application, ApplicationDocument } from "../models";
export declare class ApplicationService {
    private appModel;
    private walletService;
    private usersService;
    private readonly connection;
    constructor(appModel: Model<ApplicationDocument>, walletService: WalletService, usersService: UsersService, connection: mongoose.Connection);
    getInstance(jsonObj: any): Application & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    };
    create(createappDTO: CreateAppDTO, user: any): Promise<{
        app: Application;
        wallet: Wallet;
    }>;
    findAll(): Promise<ApplicationDocument[]>;
    findByField(appObj: Record<string, any>): Promise<ApplicationDocument[]>;
    findOneByField(appObj: Record<string, any>): Promise<Application>;
    findListAppByOwner(userID: string): Promise<{
        wallet: import("src/wallet/models").WalletDocument;
        app: Application;
    }[]>;
}

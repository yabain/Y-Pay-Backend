import mongoose, { Document } from 'mongoose';
import { User } from '../../user/models';
import { CanUseInProdState } from '../enum';
export declare type ApplicationDocument = Application & Document;
export declare class Application {
    name: string;
    urlToCallBack: string;
    owner: User;
    clientIdSandbox: string;
    privateKeySandbox: string;
    clientIdProd: string;
    privateKeyProd: string;
    createdAt: Date;
    isDeleted: false;
    files: mongoose.Types.ObjectId[];
    canUseInProdModeState: CanUseInProdState;
}
export declare const ApplicationSchema: mongoose.Schema<Application, mongoose.Model<Application, any, any, any, any>, {}, {}, {}, {}, "type", Application>;

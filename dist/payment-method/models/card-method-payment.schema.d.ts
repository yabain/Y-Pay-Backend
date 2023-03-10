import mongoose, { Document } from "mongoose";
import { User } from "src/user/models";
export declare type CardMethodPaymentDocument = CardMethodPayment & Document;
export declare class CardMethodPayment {
    number: string;
    expirationDate: string;
    ownerName: string;
    owner: User;
    createdAt: Date;
    fulnameFacturation: string;
    companyFacturation: string;
    countryFacturation: string;
    addressFacturation: string;
    cityFacturation: string;
    regionFacturation: string;
    postalCodeFacturation: string;
    phoneNumberFacturation: string;
    emailFacturation: string;
    isDeleted: boolean;
}
export declare const CardMethodPaymentSchema: mongoose.Schema<CardMethodPayment, mongoose.Model<CardMethodPayment, any, any, any, any>, {}, {}, {}, {}, "type", CardMethodPayment>;

import mongoose, { Model } from "mongoose";
import { UsersService } from "src/user/services";
import { CreateCardPaymentMethodDTO } from "../dtos/create-card-payment-method.dto";
import { CardMethodPayment, CardMethodPaymentDocument } from "../models";
export declare class CardPaymentMethodService {
    private cardMethodPaymentModel;
    private usersService;
    private readonly connection;
    constructor(cardMethodPaymentModel: Model<CardMethodPaymentDocument>, usersService: UsersService, connection: mongoose.Connection);
    create(createCardPaymentMethodDTO: CreateCardPaymentMethodDTO, user: any): Promise<CardMethodPaymentDocument>;
    update(filter: Record<string, any>, toUpdate: Record<string, any>, session?: any): Promise<CardMethodPayment & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    delete(cardPaymentID: string): Promise<CardMethodPaymentDocument>;
}

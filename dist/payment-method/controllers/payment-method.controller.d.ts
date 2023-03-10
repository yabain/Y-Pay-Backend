import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { CreateCardPaymentMethodDTO } from "../dtos/create-card-payment-method.dto";
import { CardPaymentMethodService } from "../services";
export declare class PaymentMethodController {
    private cardPaymentMethodService;
    constructor(cardPaymentMethodService: CardPaymentMethodService);
    addCardPaymentMethod(request: Request, createCardPaymentMethodDTO: CreateCardPaymentMethodDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../models").CardMethodPaymentDocument;
    }>;
    addMobilePaymentMethod(): Promise<void>;
    deletePaymentMethod(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../models").CardMethodPaymentDocument;
    }>;
}

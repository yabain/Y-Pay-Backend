import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { CreateFinancialTransactionDTO } from "../dtos";
import { PaymentService } from "../services";
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    makePayment(request: Request, createFinancialTransactionDTO: CreateFinancialTransactionDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    checkPayment(request: Request, ref: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
}

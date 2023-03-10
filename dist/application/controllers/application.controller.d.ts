import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import mongoose from "mongoose";
import { ActivityLoggerService } from "src/activity/services";
import { Ticket } from "src/ticket/models";
import { MessageService, TicketService } from "src/ticket/services";
import { Wallet } from "src/wallet/models";
import { CreateAppDTO } from "../dtos";
import { Application } from "../models";
import { ApplicationService, AuthService } from "../services";
export declare class ApplicationController {
    private appService;
    private appAuthService;
    private activityLogger;
    private tiketService;
    private messageService;
    constructor(appService: ApplicationService, appAuthService: AuthService, activityLogger: ActivityLoggerService, tiketService: TicketService, messageService: MessageService);
    createApp(request: Request, createAppDTO: CreateAppDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            app: Application;
            wallet: Wallet;
        };
    }>;
    getAppList(request: Request): Promise<{
        statusCode: HttpStatus;
        messae: string;
        data: {
            wallet: import("src/wallet/models").WalletDocument;
            app: Application;
        }[];
    }>;
    goToProd(appID: string, request: Request): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            message: import("src/ticket/models").Message & {
                _id: mongoose.Types.ObjectId;
            };
            ticket: Ticket;
        };
    }>;
}

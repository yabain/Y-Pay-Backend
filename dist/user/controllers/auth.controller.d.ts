/// <reference types="passport" />
import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { ActivityLoggerService } from "src/activity/services";
import { ConfirmationEmailDTO, CreateUserDTO, ResetPasswordDTO } from "../dtos";
import { AuthService, UsersService } from "../services";
import { UserEmailService } from "../services/user-email.service";
export declare class AuthController {
    private readonly usersService;
    private authService;
    private userEmailService;
    private activityLogService;
    constructor(usersService: UsersService, authService: AuthService, userEmailService: UserEmailService, activityLogService: ActivityLoggerService);
    register(createUserDTO: CreateUserDTO): Promise<{
        statusCode: number;
        message: string;
        data: import("../models").User;
    }>;
    login(request: Request): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            user: Express.User;
            access_token: string;
        };
    }>;
    refreshToken(): Promise<void>;
    logout(): Promise<void>;
    resetPassword(request: Request, resetPasswordDTO: ResetPasswordDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    sendResetPasswordMail(emailDTO: ConfirmationEmailDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}

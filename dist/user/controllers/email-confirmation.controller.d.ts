import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { ConfirmationEmailDTO } from "../dtos";
import { UsersService } from "../services";
import { UserEmailService } from "../services/user-email.service";
export declare class EmailConfirmationController {
    private userEmailService;
    private userService;
    constructor(userEmailService: UserEmailService, userService: UsersService);
    sendEmailConfirmation(emailDTO: ConfirmationEmailDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    confirmEmail(request: Request): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}

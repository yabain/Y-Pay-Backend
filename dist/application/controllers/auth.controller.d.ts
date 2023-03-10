import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { ApplicationService, AuthService } from "../services";
export declare class AuthController {
    private appService;
    private appAuthService;
    constructor(appService: ApplicationService, appAuthService: AuthService);
    authApp(request: Request): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            token: string;
        };
    }>;
}

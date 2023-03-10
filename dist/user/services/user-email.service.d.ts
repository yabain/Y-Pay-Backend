import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/shared/services/emails";
import { User } from "../models";
export declare class UserEmailService {
    private emailService;
    private configService;
    private jwtService;
    constructor(emailService: EmailService, configService: ConfigService, jwtService: JwtService);
    sendNewUserEmail(user: User): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/ses").SendEmailResponse, import("aws-sdk").AWSError>>;
    sendConfirmationEmail(user: any): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/ses").SendEmailResponse, import("aws-sdk").AWSError>>;
    sendResetPasswordEmail(user: any): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/ses").SendEmailResponse, import("aws-sdk").AWSError>>;
    sendTemplateEmail(sender: any, receiver: any, template: any, templateVar: any): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/ses").SendEmailResponse, import("aws-sdk").AWSError>>;
}

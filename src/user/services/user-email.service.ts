import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config";
import { Email, EmailService } from "src/shared/services/emails";
import { User } from "../models";

@Injectable()
export class UserEmailService
{
    constructor(private emailService:EmailService,private configService:ConfigService){}
    sendNewUserEmail(user:User)
    {
        return this.emailService.sendEmail(
            new Email()
            .from(this.configService.get<string>("NO_REPLY_EMAIL_SENDER"))
            .to(user.email)
            .templateVar({})
            .template(this.configService.get<string>("EMAIL_TEMPLATE_REGISTRATION"))
        )
    }

    sendConfirmationEmail(user:User)
    {
        return this.emailService.sendEmail(
            new Email()
            .from(this.configService.get<string>("NO_REPLY_EMAIL_SENDER"))
            .to(user.email)
            .templateVar({})
            .template(this.configService.get<string>("EMAIL_TEMPLATE_ACCOUNT_CONFIRMATION"))
        )
    }
}
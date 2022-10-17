import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Email, EmailService } from "src/shared/services/emails";
import { User } from "../models";

@Injectable()
export class UserEmailService
{
    constructor(private emailService:EmailService,private configService:ConfigService,private jwtService:JwtService){}
    sendNewUserEmail(user:User)
    {
        return this.emailService.sendEmail(
            new Email()
            .from(this.configService.get<string>("TEAM_EMAIL_SENDER"))
            .to(user.email)
            .templateVar({
                userEmail: `${user.firstName} ${user.lastName}`,
            })
            .template(this.configService.get<string>("EMAIL_TEMPLATE_NEW_REGISTRATION"))
        )
    }

    sendConfirmationEmail(user)
    {
        // https://www.y-nkap.com/mailconf/email$codeuniquedeconfirm link email confirmation
        const accessToken = this.jwtService.sign({
            email:user.email,
            permissions:[user.permissions],
            sub:user._id
        })
        let url=`${this.configService.get<string>("PUBLIC_FRONTEND_URL")}mailconf/${accessToken}`

        return this.emailService.sendEmail(
            new Email()
            .from(this.configService.get<string>("NO_REPLY_EMAIL_SENDER"))
            .to(user.email)
            .templateVar({
                userEmail: `${user.firstName} ${user.lastName}`,
                confirmationLink:url
            })
            .template(this.configService.get<string>("EMAIL_TEMPLATE_ACCOUNT_CONFIRMATION"))
        )
        
    }

    sendTestEmail(user)
    {
        return this.emailService.sendEmail(
            new Email()
            .subject("Email Test ")
            .from(this.configService.get<string>("NO_REPLY_EMAIL_SENDER"))
            .to(user.email)
            .content(`New Email from  ${user.email}`)
        )
    }
}
import { BadRequestException, Controller, Get, HttpStatus, Req, UseGuards } from "@nestjs/common"
import { UserJwtAuthGuard } from "../guards";
import { UsersService } from "../services";
import { UserEmailService } from "../services/user-email.service";

@Controller("email")
export class EmailConfirmationController
{
    constructor(
        private userEmailService:UserEmailService,
        private userService:UsersService
    ){}

    @Get("send-confirmation")
    async sendEmailConfirmation(@Req() request)
    {
        let user = await this.userService.findOneByField({"email":request.user.email})
        await this.userEmailService.sendConfirmationEmail(user)
        return {
            statusCode:HttpStatus.OK,
            message:"Account confirmation email has been sent",
        }
    }

    @Get("confirm")
    @UseGuards(UserJwtAuthGuard)
    async confirmEmail(@Req() request)
    {
        let user = await this.userService.findOneByField({"email":request.user.email})
        if(user.emailConfirmed) throw new BadRequestException({
            statusCode:HttpStatus.BAD_REQUEST,
            error:"EmailConfirmation",
            message:"The email has already been confirmed"
        })

        await this.userService.confirmedAccount(user);
        return {
            statusCode:HttpStatus.OK,
            message:"The email has been successfully confirmed",
        }
    }
}
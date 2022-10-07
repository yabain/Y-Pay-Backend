import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UserJwtAuthGuard } from "src/user/guards";
import { CreateAppDTO } from "../dtos";
import { AuthBasicGuard } from "../guards/auth-basic.guard";
import { ApplicationService, AuthService } from "../services";

@ApiTags("Application")
@Controller("apps/auth")
export class AuthController
{
    constructor(private appService:ApplicationService,private appAuthService:AuthService){}

    /**
     * @api {get} /apps/auth/token Get Application token
     * @apiName Token
     * @apiGroup Application
     *
     */
    @Get('token')
    @UseGuards(AuthBasicGuard)
    async authApp(@Req() request:Request)
    {
        // request.headers.authorization
        return {
            statusCode:HttpStatus.OK,
            message:"Authentication Success",
            data:this.appAuthService.createApiKey(request.user)
        }
    }
}
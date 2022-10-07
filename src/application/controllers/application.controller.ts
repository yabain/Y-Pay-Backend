import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UserJwtAuthGuard } from "src/user/guards";
import { User } from "src/user/models";
import { Wallet } from "src/wallet/models";
import { CreateAppDTO } from "../dtos";
import { AuthBasicGuard } from "../guards/auth-basic.guard";
import { Application, ApplicationSchema } from "../models";
import { ApplicationService, AuthService } from "../services";

@ApiTags("Application")
@ApiBearerAuth()
@Controller("apps")
export class ApplicationController
{
    constructor(private appService:ApplicationService,private appAuthService:AuthService){}

    /**
     * 
     * @api {post} /apps/create create new app
     * @apiDescription create new app
     * @apiName Create apps
     * @apiGroup Application
     * @apiUse apiSecurity
     * @apiUse apiDefaultResponse
     * @apiUse CreateAppDTO
     * 
     * @apiSuccess (201) {Number} statusCode status code
     * @apiSuccess (201) {String} Response Description
     * @apiSuccess (201) {Object} data response data
     * @apiSuccess (201) {Object} data.app Application data
     * @apiSuccess (201) {Object} data.app Wallet data
     * 
     */
    @ApiOkResponse()
    @UseGuards(UserJwtAuthGuard)
    @Post('create')
    @ApiBody({type:CreateAppDTO})
    async createApp(@Req() request:Request, @Body() createAppDTO:CreateAppDTO)
    {
        
        return {
            statusCode:HttpStatus.CREATED,
            message:"The application was created successfully",
            data: await this.appService.create(createAppDTO,request.user)
        }
    }
}
import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Activity } from "src/activity/models";
import { ActivityLoggerService } from "src/activity/services";
import { EmailConfirmedGuard, UserJwtAuthGuard } from "src/user/guards";
import { User } from "src/user/models";
import { Wallet } from "src/wallet/models";
import { CreateAppDTO } from "../dtos";
import { AuthBasicGuard } from "../guards/auth-basic.guard";
import { Application, ApplicationSchema } from "../models";
import { ApplicationService, AuthService } from "../services";

@UseGuards(EmailConfirmedGuard)
@ApiBearerAuth()
@Controller("apps")
export class ApplicationController
{
    constructor(
        private appService:ApplicationService,
        private appAuthService:AuthService,
        private activityLogger:ActivityLoggerService
        ){
            // this.activityLogger.setContext(ApplicationController.name)
            // this.activityLogger.logActivity(this.activityLogger.getLogActivityInstance({
            //     date:new Date(),
            //     hasError:true
            // }))
        }

    /**
     * 
     * @api {post} /apps create new app
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
     * @apiSuccess (201) {Object} data.wallet Wallet data
     * 
     */
    @Post()    
    @UseGuards(UserJwtAuthGuard)    
    async createApp(@Req() request:Request, @Body() createAppDTO:CreateAppDTO)
    {
        
        return {
            statusCode:HttpStatus.CREATED,
            message:"The application was created successfully",
            data: await this.appService.create(createAppDTO,request.user)
        }
    }

    /**
     * @api {get} /apps get list of applications
     * @apiDescription Allows to obtain the list of applications of the connected user
     * @apiName List apps
     * @apiGroup Application
     * @apiUse apiSecurity
     * @apiUse apiDefaultResponse
     * @apiSuccess (201) {Number} statusCode status code
     * @apiSuccess (201) {String} Response Description
     * @apiSuccess (201) {Array} data response data
     * @apiSuccess (201) {Object} data.app Application data
     * @apiSuccess (201) {Object} data.app Wallet data
     * @apiSuccess (201) {Number} size Number of applications
     * 
     */
    @UseGuards(UserJwtAuthGuard)
    @Get()
    async getAppList(@Req() request:Request)
    {
        return {
            statusCode:HttpStatus.OK,
            messae:"List of apps",
            data:await this.appService.findListAppByOwner(request.user["userId"])
        }
    }
}
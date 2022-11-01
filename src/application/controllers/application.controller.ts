import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards,Param, HttpCode } from "@nestjs/common"
import { Request } from "express";
import mongoose from "mongoose";
import { Activity } from "src/activity/models";
import { ActivityLoggerService } from "src/activity/services";
import { ObjectIDValidationPipe } from "src/shared/pipes";
import { CreateMessageDTO, CreateTicketDTO } from "src/ticket/dtos";
import { Ticket } from "src/ticket/models";
import { MessageService, TicketService } from "src/ticket/services";
import { EmailConfirmedGuard, UserJwtAuthGuard } from "src/user/guards";
import { User } from "src/user/models";
import { Wallet } from "src/wallet/models";
import { CreateAppDTO } from "../dtos";
import { AuthBasicGuard } from "../guards/auth-basic.guard";
import { Application, ApplicationSchema } from "../models";
import { ApplicationService, AuthService } from "../services";

// @UseGuards(EmailConfirmedGuard)
@Controller("apps")
export class ApplicationController
{
    constructor(
        private appService:ApplicationService,
        private appAuthService:AuthService,
        private activityLogger:ActivityLoggerService,
        private tiketService:TicketService,
        private messageService:MessageService
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
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiUse apiError
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
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiUse apiError
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

    /**
     * @api {get} /apps/ask-prod/:appID Release request
     * @apiDescription allows you to request the production of an application
     * @apiName Release request
     * @apiParam {String} appID Application ID     
     * @apiGroup Application
     * @apiUse apiSecurity
     * @apiUse apiDefaultResponse
     * @apiSuccess (200) {Number} statusCode status code
     * @apiSuccess (200) {String} Response Description
     * @apiSuccess (200) {Object} data response data
     * @apiSuccess (200) {Object} data.message Message data
     * @apiSuccess (200) {Object} data.ticket Ticket data
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiUse apiError
     */
    @Get("ask-prod/:appID")
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UserJwtAuthGuard)
    async goToProd(@Param("appID",ObjectIDValidationPipe) appID:string,@Req() request:Request)
    {
        let app=await this.appService.findOneByField({_id:new mongoose.Types.ObjectId(appID)});

        let ticketDTO:CreateTicketDTO=new CreateTicketDTO();
        ticketDTO.app=appID;
        ticketDTO.title=`Request for production of the application named ${app.name}`
        let ticket:Ticket = await this.tiketService.create(ticketDTO,request.user);

        let messageDTO:CreateMessageDTO=new CreateMessageDTO()
        messageDTO.ticket=ticket._id.toString();
        messageDTO.to=request.user["userId"];
        messageDTO.content=`
        Hello <br/>,
        You have requested the production of your product ${app.name}. to complete these steps, please send the following items through this channel:
        <ol>
        <li>Your company's commercial register</li>
        <li>A description of your project</li>
        </ol>             
        Sincerely<br/>
        Y-Nkap Cameroon<br>
        <a href="mailto:support@y-nkap.com">support@y-nkap.com</a>`;
        let message=await this.messageService.create(messageDTO,request.user)

        return {
            statusCode:HttpStatus.CREATED,
            message:"Launch process to prod mode completed successfully",
            data:{message, ticket}
        }
    }
}
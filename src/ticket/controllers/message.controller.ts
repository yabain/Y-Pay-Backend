import { Body, Controller,HttpStatus,Post,Get,Param, UseGuards,Req } from "@nestjs/common";
import { Request } from "express"
import { ObjectIDValidationPipe } from "src/shared/pipes";
import { UserJwtAuthGuard } from "src/user/guards";
import { CreateMessageDTO } from "../dtos";
import { MessageService } from "../services";

@Controller("message")
export class MessageController
{
    constructor(
        private messageService:MessageService
    ){}

    /**
     * @api {post} /message Create a new message
     * @apiDescription Allows you to create a new message in a ticket
     * @apiName New message
     * @apiGroup Ticket
     * @apiUse CreateMessageDTO
     * @apiUse apiSecurity
     * @apiUse apiDefaultResponse
     * @apiSuccess (201) {Number} statusCode status code
     * @apiSuccess (201) {String} Response Description
     * @apiSuccess (201) {Object} data response data
     * @apiSuccess (201) {String} data.from ID of the sender of the message
     * @apiSuccess (201) {String} data.to Message receiver ID
     * @apiSuccess (201) {String} data.tiken ticket ID of the ticket associated with the message
     * @apiSuccess (201) {String} data.content Message content
     * @apiSuccess (201) {Boolean} data.isRead allows to specify if the message is read (true) or not (false)
     * @apiSuccess (201) {Date} data.createdAt Post creation date
     * 
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiError (Error 4xx) 404-NotFound The ticket/sender/receiver was not found 
     * @apiUse apiError
     */
    @Post()
    @UseGuards(UserJwtAuthGuard)
    async newMessage(@Body() createMessageDTO:CreateMessageDTO,@Req() request:Request)
    {
        return {
            statusCode:HttpStatus.CREATED,
            message:"New message saved successfully",
            data:await this.messageService.create(createMessageDTO,request.user)
        }
    }

    /**
     * @api {get} /message/ticket/:ticketID get list of messages from ticket id
     * @apiDescription get list of messages from ticket id
     * @apiName Get message list
     * @apiParam {String} ticketID ticket ID
     * @apiGroup Ticket
     * @apiUse apiSecurity
     * @apiUse apiDefaultResponse
     * @apiSuccess (201) {Number} statusCode status code
     * @apiSuccess (201) {String} Response Description
     * @apiSuccess (201) {Array} data response data
     * @apiSuccess (201) {String} data.from ID of the sender of the message
     * @apiSuccess (201) {String} data.to Message receiver ID
     * @apiSuccess (201) {String} data.tiken ticket ID of the ticket associated with the message
     * @apiSuccess (201) {String} data.content Message content
     * @apiSuccess (201) {Boolean} data.isRead allows to specify if the message is read (true) or not (false)
     * @apiSuccess (201) {Date} data.createdAt Post creation date
     * 
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiError (Error 4xx) 404-NotFound The ticket was not found 
     * @apiUse apiError
     */
    @Get("/ticket/:ticketID")
    @UseGuards(UserJwtAuthGuard)
    async getMessage(@Param("ticketID", ObjectIDValidationPipe) ticketID:string )
    {
        return {
            statusCode: HttpStatus.OK,
            message:"List of messages found",
            data:await this.messageService.findListMessageByTicket(ticketID)
        }
    }
}
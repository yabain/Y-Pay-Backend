import { Body, Controller, Post, Get , UseGuards, Req, HttpStatus, Param, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { ObjectIDValidationPipe } from "src/shared/pipes";
import { UserJwtAuthGuard } from "src/user/guards";
import { CreateTicketDTO } from "../dtos/create-ticket.dto";
import { Ticket } from "../models";
import { TicketService } from "../services";

@Controller("ticket")
export class TicketController
{
    constructor(private ticketService:TicketService){}

    /**
     * 
     * @api {post} /ticket Create a new ticket
     * @apiDescription Create a new ticket
     * @apiName Create tickets
     * @apiGroup Ticket
     * @apiUse apiSecurity
     * @apiUse apiDefaultResponse
     * @apiUse TicketDTO
     * 
     * @apiSuccess (201) {Number} statusCode status code
     * @apiSuccess (201) {String} Response Description
     * @apiSuccess (201) {Object} data response data
     * @apiSuccess (201) {String} data._id Ticket ID
     * @apiSuccess (201) {String} data.title ticket title
     * @apiSuccess (201) {String} data.owner ID of the user who owns the ticket
     * @apiSuccess (201) {String} data.state Ticket status (open/closed)
     * @apiSuccess (201) {Array} data.file Table of file sent in ticket
     * @apiSuccess (201) {Date} data.createdAt Ticket creation date
     * 
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiUse apiError
     * 
     */
    @Post()
    @UseGuards(UserJwtAuthGuard)
    async createTicket(@Body() createTicketDTO:CreateTicketDTO, @Req() request:Request)
    {
        return {
            statusCode:HttpStatus.CREATED,
            message:"The ticket was successfully created",
            data:await this.ticketService.create(createTicketDTO,request.user)
        }
    } 

     /**
     * 
     * @api {get} /ticket/:id Create a new ticket
     * @apiDescription Create a new ticket
     * @apiParam {String} id ticket ID
     * @apiName Get ticket
     * @apiGroup Ticket
     * @apiUse apiSecurity
     * @apiUse apiDefaultResponse
     * 
     * @apiSuccess (201) {Number} statusCode status code
     * @apiSuccess (201) {String} Response Description
     * @apiSuccess (201) {Object} data response data
     * @apiSuccess (201) {String} data._id Ticket ID
     * @apiSuccess (201) {String} data.title ticket title
     * @apiSuccess (201) {String} data.owner ID of the user who owns the ticket
     * @apiSuccess (201) {String} data.state Ticket status (open/closed)
     * @apiSuccess (201) {Array} data.file Table of file sent in ticket
     * @apiSuccess (201) {Date} data.createdAt Ticket creation date
     * 
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiError (Error 4xx) 404-NotFound Ticket not found
     * @apiUse apiError
     * 
     */
    @Get(":id")
    @UseGuards(UserJwtAuthGuard)
    async getTicketById(@Param('id',ObjectIDValidationPipe) id:string)
    {
        let ticket:Ticket=await this.ticketService.findOneByField({"_id":id});
        if(!ticket) throw new NotFoundException({
            statusCode:HttpStatus.NOT_FOUND,
            message:"ticket not found",
            error:["Not Found"]
        })

        return {
            statusCode:HttpStatus.OK,
            message:"ticket found",
            data:ticket
        }
    }
}
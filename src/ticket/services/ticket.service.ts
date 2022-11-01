import { HttpStatus, Injectable,NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ApplicationService } from "src/application/services";
import { UsersService } from "src/user/services";
import { CreateTicketDTO } from "../dtos";
import { TicketState } from "../enums";
import { Ticket } from "../models";

@Injectable()
export class TicketService
{
    constructor(
        @InjectModel(Ticket.name) private ticketModel:Model<Ticket>,
        private userService:UsersService,
        private appService:ApplicationService
        ){}

    async create(createTicketDTO:CreateTicketDTO,user)
    {
        createTicketDTO.owner=await this.userService.findOneByField({"email":user.email})

        if(createTicketDTO.app) {
            let app=await this.appService.findOneByField({_id:createTicketDTO.app});
            if(!app) throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                error:"Not Found",
                message:["the application whose identifier was not found"]
            })
            // ticketObj["app"]=app
            createTicketDTO.app=app;
        }
        return new this.ticketModel(createTicketDTO).save()
    }

    async findAll(): Promise<Ticket[]>
    {
        return this.findByField({});
    }

    async findByField(ticketObj:Record<string,any>):Promise<Ticket[]>
    {
        return this.ticketModel.find<Ticket>(ticketObj).sort({createdAt:1}).exec()
    }

    async findOneByField(ticketObj:Record<string,any>):Promise<Ticket>
    {
        return this.ticketModel.findOne<Ticket>(ticketObj).exec()
    }

    async findListTicketByOwner(userID:string)
    {
        return this.findByField({owner:userID});
    }

    async findListTicketByStateAndOwner(userId:string,state:TicketState)
    {
        return this.findByField({owner:userId,state})
    }

    async findTicketByRef(ref:number)
    {
        return this.findByField({refNumber:ref})
    }

}
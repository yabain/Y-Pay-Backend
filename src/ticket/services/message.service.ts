import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { PERMISSIONS } from "src/user/enum";
import { UsersService } from "src/user/services";
import { CreateMessageDTO } from "../dtos";
import { Message } from "../models";
import { TicketService } from "./ticket.service";

@Injectable()
export class MessageService
{
    constructor(
        @InjectModel(Message.name) private messageModel:Model<Message>,
        private usersService:UsersService,
        private ticketService:TicketService
        ){}

    async create(message:CreateMessageDTO,userObj)
    {
        if(message.from){
            message.from=await this.usersService.findOneByField({"_id":message.from});
            if(!message.from) throw new NotFoundException({
                statusCode:HttpStatus.NOT_FOUND,
                error:"Not Found",
                message:["The sender of the message was not found"]
            })
        }
        else {
            let user = await this.usersService.findOneByField({"email":userObj.email});
            if(user.permissions==PERMISSIONS.USER) message.from=user;
        }

        if(message.to) {
            message.to=await this.usersService.findOneByField({"_id":message.to});
            if(!message.to) throw new NotFoundException({
                statusCode:HttpStatus.NOT_FOUND,
                error:"Not Found",
                message:["The recipient of the message was not found"]
            })
        }

        message.ticket= await this.ticketService.findOneByField({"_id":message.ticket})
        if(!message.ticket) throw new NotFoundException({
            statusCode:HttpStatus.NOT_FOUND,
            error:"Not Found",
            message:["The ticket was not found"]
        })
        return new this.messageModel(message).save()
    }

    async findAll(): Promise<Message[]>
    {
        return this.findByField({});
    }

    async findByField(messageObj:Record<string,any>):Promise<Message[]>
    {
        return this.messageModel.find<Message>(messageObj).sort({createdAt:1}).exec()
    }

    async findOneByField(messageObj:Record<string,any>):Promise<Message>
    {
        return this.messageModel.findOne<Message>(messageObj).exec()
    }

    async findListMessageByTicket(ticketID:string)
    {
        let ticket= await this.ticketService.findOneByField({"_id":new mongoose.Types.ObjectId(ticketID)})
        if(!ticket) throw new NotFoundException({
            statusCode:HttpStatus.NOT_FOUND,
            error:"Not Found",
            message:["The ticket was not found"]
        })
        return this.findByField({ticket:new mongoose.Types.ObjectId(ticketID)});
    }

    async update(filter:Record<string,any>,toUpdate:Record<string,any>,session=null)
    {
        return this.messageModel.findOneAndUpdate(filter,toUpdate,{session,new:true});
    }

    async getLastUnreadMessage(ticketID)
    {
        // return this.activityModel.find<Activity>({"_id":userId}).sort({createdAt:1}).limit(limit).skip(page*limit).exec()
        return this.findByField({ticket:ticketID,isRead:false});
    }

    async markMessageAsRead(messageID,session=null)
    {
        return this.update({'_id':new mongoose.Types.ObjectId(messageID)},{isRead:true},session)
    }

}
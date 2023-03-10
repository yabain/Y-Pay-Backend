import mongoose, { Model } from "mongoose";
import { UsersService } from "src/user/services";
import { CreateMessageDTO } from "../dtos";
import { Message } from "../models";
import { TicketService } from "./ticket.service";
export declare class MessageService {
    private messageModel;
    private usersService;
    private ticketService;
    constructor(messageModel: Model<Message>, usersService: UsersService, ticketService: TicketService);
    create(message: CreateMessageDTO, userObj: any): Promise<Message & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<Message[]>;
    findByField(messageObj: Record<string, any>): Promise<Message[]>;
    findOneByField(messageObj: Record<string, any>): Promise<Message>;
    findListMessageByTicket(ticketID: string): Promise<Message[]>;
    update(filter: Record<string, any>, toUpdate: Record<string, any>, session?: any): Promise<Message & {
        _id: mongoose.Types.ObjectId;
    }>;
    getLastUnreadMessage(ticketID: any): Promise<Message[]>;
    markMessageAsRead(messageID: any, session?: any): Promise<Message & {
        _id: mongoose.Types.ObjectId;
    }>;
}

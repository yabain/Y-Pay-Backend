/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { ApplicationService } from "src/application/services";
import { UsersService } from "src/user/services";
import { CreateTicketDTO } from "../dtos";
import { TicketState } from "../enums";
import { Ticket } from "../models";
export declare class TicketService {
    private ticketModel;
    private userService;
    private appService;
    constructor(ticketModel: Model<Ticket>, userService: UsersService, appService: ApplicationService);
    create(createTicketDTO: CreateTicketDTO, user: any): Promise<Ticket & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<Ticket[]>;
    findByField(ticketObj: Record<string, any>): Promise<Ticket[]>;
    findOneByField(ticketObj: Record<string, any>): Promise<Ticket>;
    findListTicketByOwner(userID: string): Promise<Ticket[]>;
    findListTicketByStateAndOwner(userId: string, state: TicketState): Promise<Ticket[]>;
    findTicketByRef(ref: number): Promise<Ticket[]>;
    update(filter: Record<string, any>, toUpdate: Record<string, any>, session?: any): Promise<Ticket & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addFile(filter: Record<string, any>, files: any, session?: any): Promise<Ticket & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

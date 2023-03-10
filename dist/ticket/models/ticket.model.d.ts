import mongoose, { Document } from "mongoose";
import { Application } from "src/application/models";
import { User } from "src/user/models";
import { TicketState } from "../enums";
export declare class Ticket extends Document {
    refNumber: number;
    app: Application;
    title: string;
    owner: User;
    state: TicketState;
    files: mongoose.Types.ObjectId[];
    closedBy: User;
    createdAt: Date;
}
export declare const TicketSchema: mongoose.Schema<Ticket, mongoose.Model<Ticket, any, any, any, any>, {}, {}, {}, {}, "type", Ticket>;

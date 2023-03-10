import mongoose, { Document } from "mongoose";
import { User } from "src/user/models";
import { Ticket } from "./ticket.model";
export declare class Message extends Document {
    from: User;
    to: User;
    ticket: Ticket;
    isRead: Boolean;
    content: String;
    isDeleted: Boolean;
    createdAt: Date;
}
export declare const MessageSchema: mongoose.Schema<Message, mongoose.Model<Message, any, any, any, any>, {}, {}, {}, {}, "type", Message>;

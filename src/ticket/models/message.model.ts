import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/models";
import { Ticket } from "./ticket.model";

@Schema({
    toObject: {
        transform: function (doc, ret) {
            if(ret.from) ret.from=ret.from._id;
            if(ret.to) ret.to=ret.to._id;
            ret.ticket=ret.ticket._id;
            delete ret.isDeleted;
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            if(ret.from) ret.from=ret.from._id;
            if(ret.to) ret.to=ret.to._id;
            ret.ticket=ret.ticket._id;
            delete ret.isDeleted;
            delete ret.__v;

        }
    }
})
export class Message extends Document
{
    @Prop({type:mongoose.Types.ObjectId,ref:User.name,default:null})
    from:User;

    @Prop({type:mongoose.Types.ObjectId,ref:User.name,default:null})
    to:User;

    @Prop({type:mongoose.Types.ObjectId,ref:Ticket.name,default:null})
    ticket:Ticket;

    @Prop({type:Boolean,default:false})
    isRead:Boolean;

    @Prop({required:true})
    content:String

    @Prop({type:Boolean,default:false})
    isDeleted:Boolean

    @Prop({default:Date.now(),required:true})
    createdAt:Date

    
}

export const MessageSchema = SchemaFactory.createForClass(Message)
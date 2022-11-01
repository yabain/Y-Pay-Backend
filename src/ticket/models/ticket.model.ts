import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document, Mongoose } from "mongoose"
import { Application } from "src/application/models";
import { File } from "src/files/models";
import { User } from "src/user/models";
import { TicketState } from "../enums";

@Schema({
    toObject: {
        transform: function (doc, ret) {
            ret.owner=ret.owner._id;
            ret.app=ret.app._id;
            if(ret.closedBy) ret.closedBy=ret.closedBy._id;
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            ret.owner=ret.owner._id;
            ret.app=ret.app._id;
            if(ret.closedBy) ret.closedBy=ret.closedBy._id;
            delete ret.__v;

        }
    }
})
export class Ticket extends Document
{
    @Prop({type:Number,required:true,unique:true,default:Math.floor(Math.random()*10000000)})
    refNumber:number;

    @Prop({type:mongoose.Types.ObjectId, ref:Application.name})
    app:Application;

    @Prop({type:String,required:true})
    title:string;

    @Prop({type:mongoose.Types.ObjectId, ref:User.name, required:true})
    owner:User;

    @Prop({enum:TicketState,default:TicketState.CLOSED})
    state:TicketState;

    @Prop({type:[mongoose.Types.ObjectId],ref:File.name,default:[]})
    files:mongoose.Types.ObjectId[]

    @Prop({type:mongoose.Types.ObjectId,ref:User.name})
    closedBy:User;

    @Prop({type:Date,default:Date.now()})
    createdAt:Date
}


export const TicketSchema = SchemaFactory.createForClass(Ticket)
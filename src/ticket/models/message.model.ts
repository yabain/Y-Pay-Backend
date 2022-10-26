import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/models";

export class Message extends Document
{
    @Prop({type:mongoose.Types.ObjectId,ref:User.name})
    from:User;

    @Prop({type:mongoose.Types.ObjectId,ref:User.name})
    to:User;

    files:string[]

}
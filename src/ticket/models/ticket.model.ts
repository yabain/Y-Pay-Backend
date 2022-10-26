import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

@Schema()
export class Ticket extends Document
{
    @Prop({type:Boolean})
    refNumber:number;

    @Prop({type:String})
    title:string;




}

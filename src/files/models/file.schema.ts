import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class File extends Document
{
    @Prop()
    url:string;

    @Prop()
    key:string;

    @Prop()
    name:string;

    @Prop()
    bucket:string;
}

export const FileSchema = SchemaFactory.createForClass(File)
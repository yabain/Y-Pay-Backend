import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { uid } from "rand-token";
import { v4 as uuidv4 } from 'uuid';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/models';
import { CanUseInProdState } from '../enum';
import { File } from 'src/files/models';

export type ApplicationDocument =  Application & Document;

@Schema({
    toObject: {
        transform: function (doc, ret) {
            ret.owner=ret.owner._id;
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            ret.owner=ret.owner._id;
            delete ret.__v;

        }
    }
})
export class Application
{

    @Prop({required:true,unique:true})
    name:string;

    @Prop({default:""})
    urlToCallBack:string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:User.name,required:true})
    owner:User;

    @Prop({default:uuidv4(),required:true})
    clientIdSandbox:string;

    @Prop({default:uid(256),required:true})
    privateKeySandbox:string;

    @Prop({default:uuidv4(),required:true})
    clientIdProd:string;

    @Prop({default:uid(256),required:true})
    privateKeyProd:string;
    
    @Prop({default:Date.now(),required:true})
    createdAt:Date;

    @Prop({default:false})
    isDeleted:false;

    @Prop({type:[mongoose.Types.ObjectId],ref:File.name,default:[]})
    files:mongoose.Types.ObjectId[]

    @Prop({enum:CanUseInProdState, default:CanUseInProdState.SANDBOX})
    canUseInProdModeState:CanUseInProdState
}

export const ApplicationSchema = SchemaFactory.createForClass(Application)


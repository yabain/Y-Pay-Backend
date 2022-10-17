import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PERMISSIONS } from "../enum";
import { Document } from "mongoose";
import { UserSetting } from "./user-setting.schema";

// export type UserDocument = User & Document

@Schema({
    toObject: {
        transform: function (doc, ret) {
          delete ret.isDeleted;
          delete ret.password;
          delete ret.__v;
        }
      },
      toJSON: {
        transform: function (doc, ret) {
          delete ret.password;
          delete ret.isDeleted;
          delete ret.__v;

        }
      }
})
export class User extends Document
{
    @Prop({required:true,default:""})
    firstName:string;

    @Prop({required:true,default:""})
    lastName:string;

    @Prop({
        required:true,
        default:"",
    })
    password:string;

    @Prop({
        required:true,
        unique:true,
        match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    })
    email:string;

    @Prop({required:true,default:false})
    emailConfirmed:boolean;

    @Prop({default:""})
    profilePicture:string;

    @Prop({default:""})
    coverPicture:string;

    @Prop({default:""})
    country:string;

    @Prop({default:""})
    phoneNumber:string;

    @Prop({default:""})
    whatsappContact:string;

    @Prop({default:""})
    skype:string;

    @Prop({default:""})
    websiteLink:string;

    @Prop({default:""})
    location:string;

    @Prop({require:true,enum:PERMISSIONS,default:PERMISSIONS.USER})
    permissions:string;

    @Prop({default:Date.now(),required:true})
    createdAt:Date

    @Prop({type:UserSetting,default:{
      language:"",
      theme:"",
      currency:"",
      isEnglishTimeFormat:false
    }})
    userSetting:UserSetting;

    @Prop({default:false})
    isDeleted:boolean;
}

export const UserSchema = SchemaFactory.createForClass(User)
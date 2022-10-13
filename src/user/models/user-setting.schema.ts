import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

// export type UserSettingDocument = UserSetting & Document


@Schema({
    toObject: {
        transform: function (doc, ret) {
          delete ret.__v;
        }
      },
      toJSON: {
        transform: function (doc, ret) {
          delete ret.__v;

        }
      },
      _id:false
})
export class UserSetting extends Document {

    @Prop({default:""})
    language:string;

    @Prop({default:""})
    theme:string;

    @Prop({default:""})
    currency:string;

    @Prop({type:Boolean,default:false})
    isEnglishTimeFormat:boolean;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting)

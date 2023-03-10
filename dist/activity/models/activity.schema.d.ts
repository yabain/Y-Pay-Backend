import mongoose, { Document } from "mongoose";
import { User } from "src/user/models";
import { ErrorLevel } from "../enum";
export declare class Activity extends Document {
    owner: User;
    description: string;
    hasError: Boolean;
    errorLevel: ErrorLevel;
    otherProps: Record<string, any>;
    createdAt: Date;
}
export declare const ActivitySchema: mongoose.Schema<Activity, mongoose.Model<Activity, any, any, any, any>, {}, {}, {}, {}, "type", Activity>;

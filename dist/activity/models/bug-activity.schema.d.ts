import mongoose, { Document } from "mongoose";
import { User } from "src/user/models";
export declare class BugActivity extends Document {
    date: Date;
    owner: User;
    description: string;
    request: Record<string, any>;
    response: Record<string, any>;
    hasError: Boolean;
    otherProps: Record<string, any>;
    error: Record<string, any>;
}
export declare const BugActivitySchema: mongoose.Schema<BugActivity, mongoose.Model<BugActivity, any, any, any, any>, {}, {}, {}, {}, "type", BugActivity>;

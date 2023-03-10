import mongoose, { Model } from "mongoose";
import { Activity } from "../models";
export declare class ActivityService {
    private activityModel;
    private readonly connection;
    constructor(activityModel: Model<Activity>, connection: mongoose.Connection);
    create(activity: any): Promise<Activity>;
    getInstance(activity: Record<string, any>): Activity & {
        _id: mongoose.Types.ObjectId;
    };
    getActivityByPagination(userId: string, page: number, limit: number): Promise<Activity[]>;
}

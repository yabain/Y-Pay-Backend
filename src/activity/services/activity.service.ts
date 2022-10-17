import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Activity } from "../models";

export class ActivityService
{
    constructor(
        @InjectModel(Activity.name) private activityModel:Model<Activity>,
        @InjectConnection() private readonly connection:mongoose.Connection
    ){}

    async create(activity):Promise<Activity>
    {
        return await new this.activityModel(activity).save();
    }

    
}
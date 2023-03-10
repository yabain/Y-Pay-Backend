import { ConsoleLogger } from "@nestjs/common";
import { User } from "src/user/models";
import { ErrorLevel } from "../enum";
import { Activity } from "./../models";
import { ActivityService } from "./activity.service";
export declare class ActivityLoggerService extends ConsoleLogger {
    private activityService;
    constructor(activityService: ActivityService);
    logActivity(activity: {
        date?: Date;
        owner?: User | Record<string, any>;
        description: string;
        hasError?: boolean;
        errorLevel?: ErrorLevel;
        otherProps?: Record<string, any>;
    }): Promise<Activity>;
    private getLogActivityInstance;
}

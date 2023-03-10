import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { ActivityService } from "../services";
export declare class ActivityController {
    private activityService;
    constructor(activityService: ActivityService);
    getUserHistory(id: string, page: number, limit: number, request: Request): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../models").Activity[];
    }>;
}

import { BasicStrategy as Strategy } from "passport-http";
import { Application } from "../models";
import { ApplicationService } from "../services";
declare const BasicStrategy_base: new (...args: any[]) => Strategy;
export declare class BasicStrategy extends BasicStrategy_base {
    private readonly appService;
    constructor(appService: ApplicationService);
    validate(username: any, password: any): Promise<Application>;
}
export {};

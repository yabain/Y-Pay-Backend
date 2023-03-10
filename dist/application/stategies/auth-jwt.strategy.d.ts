import { Strategy } from "passport-jwt";
declare const AuthJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class AuthJwtStrategy extends AuthJwtStrategy_base {
    constructor();
    validate(payload: Record<string, any>): Promise<{
        clientId: any;
        userId: any;
        appId: any;
    }>;
}
export {};

import { ExecutionContext } from "@nestjs/common";
declare const AuthJwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthJwtGuard extends AuthJwtGuard_base {
    handleRequest<TUser = any>(err: any, app: any, info: any, context: ExecutionContext, status?: any): TUser;
}
export {};

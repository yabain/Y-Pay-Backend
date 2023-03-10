import { JwtService } from "@nestjs/jwt";
import { LoginUserDTO } from "../dtos/login-user.dto";
import { UsersService } from "./users.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(loginUserDTO: LoginUserDTO): Promise<import("../models").User>;
    login(user: any): {
        access_token: string;
    };
}

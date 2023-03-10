import { HttpStatus } from "@nestjs/common";
import { UsersService } from "../services";
import { UpdateUserDTO } from "../dtos";
export declare class UserProfilController {
    private userService;
    constructor(userService: UsersService);
    getUserProfilById(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../models").User;
    }>;
    deleteUserById(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updateUserById(id: string, updateUser: UpdateUserDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../models").User;
    }>;
}

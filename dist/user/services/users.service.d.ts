/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { CreateUserDTO, UpdateUserDTO } from "../dtos";
import { User } from "../models";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDTO: CreateUserDTO): Promise<User>;
    findAll(): Promise<User[]>;
    findByField(userObj: Record<string, any>): Promise<User[]>;
    findOneByField(userObj: Record<string, any>): Promise<User>;
    updateFromClass(updateUserDTO: UpdateUserDTO, userID: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(filter: Record<string, any>, toUpdate: Record<string, any>, session?: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    confirmedAccount(user: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

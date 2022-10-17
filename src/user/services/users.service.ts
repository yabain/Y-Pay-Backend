import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "../dtos";
import { User } from "../models";

@Injectable()
export class UsersService
{
    constructor(@InjectModel('User') private userModel:Model<User>){}

    async create(createUserDTO: CreateUserDTO):Promise<User>
    {
        return new this.userModel(createUserDTO).save();
    }

    async findAll(): Promise<User[]>
    {
        return this.userModel.find().exec();
    }

 
    async findByField(userObj:Record<string,any>):Promise<User[]>
    {
        return this.userModel.find<User>(userObj).exec()
    }

    async findOneByField(userObj:Record<string,any>):Promise<User>
    {
        return this.userModel.findOne<User>(userObj).exec()
    }
    async updateFromClass(updateUserDTO:UpdateUserDTO,userID)
    {
        return this.userModel.findByIdAndUpdate(userID,updateUserDTO).setOptions({new:true})
    }
    async update(filter:Record<string,any>,toUpdate:Record<string,any>,session=null)
    {
        return this.userModel.findOneAndUpdate(filter,toUpdate,{session,new:true});
    }

    async confirmedAccount(user)
    {
        return this.update({"email":user.email},{emailConfirmed:true})
    }
    
}
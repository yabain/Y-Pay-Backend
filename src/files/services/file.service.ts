import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateFileDTO } from "../dtos";
import { File } from "../models";

@Injectable()
export class FileService
{
    constructor(
        @InjectModel(File.name) private model:Model<File>
    ){}

    async create(createFileDTO:CreateFileDTO)
    {
        return new this.model(createFileDTO).save()
    }
}
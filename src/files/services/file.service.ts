import { Injectable } from "@nestjs/common"
import { InjectModel,InjectConnection } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { TicketService } from "src/ticket/services";
import { CreateFileDTO } from "../dtos";
import { File } from "../models";
import { FileS3UploadService } from "./file-s3-uplodad.service";

@Injectable()
export class FileService
{
    constructor(
        @InjectModel(File.name) private model:Model<File>,
        private uploadS3Service:FileS3UploadService,
        @InjectConnection() private connection:mongoose.Connection,
        private ticketService:TicketService
    ){}

    async create(createFileDTO:CreateFileDTO|Record<string,any>,transaction=null)
    {
        return new this.model(createFileDTO).save({session:transaction})
    }

    async uploadFile(files:Express.Multer.File[],ticketID:string=null)
    {
        const transaction = await this.connection.startSession()
        transaction.startTransaction();
        let filesResult=null;
        try
        {
            let resultFiles=await this.uploadS3Service.updloadFileToS3(files)

            filesResult=await Promise.all(resultFiles.map((file:any)=>this.create(file,transaction)))
            if(ticketID) await Promise.all(filesResult.map((file)=>this.ticketService.addFile({"_id":new mongoose.Types.ObjectId(ticketID)},file,transaction)))
            await transaction.commitTransaction();
        }
        catch(error)
        {
            await transaction.abortTransaction();
            throw error;
        }
        finally
        {
            transaction.endSession()
        }
       
        return filesResult;

    }
}
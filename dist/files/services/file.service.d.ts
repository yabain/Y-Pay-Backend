/// <reference types="multer" />
import mongoose, { Model } from "mongoose";
import { TicketService } from "src/ticket/services";
import { CreateFileDTO } from "../dtos";
import { File } from "../models";
import { FileS3UploadService } from "./file-s3-uplodad.service";
export declare class FileService {
    private model;
    private uploadS3Service;
    private connection;
    private ticketService;
    constructor(model: Model<File>, uploadS3Service: FileS3UploadService, connection: mongoose.Connection, ticketService: TicketService);
    create(createFileDTO: CreateFileDTO | Record<string, any>, transaction?: any): Promise<File & {
        _id: mongoose.Types.ObjectId;
    }>;
    uploadFile(files: Express.Multer.File[], ticketID?: string): Promise<any>;
}

/// <reference types="multer" />
import { HttpStatus } from "@nestjs/common";
import { FileService } from "../services";
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    uploadFiles(files: Express.Multer.File[], ticketID: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    downLoadFile(): Promise<void>;
}

/// <reference types="multer" />
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
export declare class FileS3UploadService {
    private s3Service;
    private configService;
    constructor(s3Service: S3, configService: ConfigService);
    updloadFileToS3(files: Express.Multer.File[]): Promise<Record<string, any>[]>;
}

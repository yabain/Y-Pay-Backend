import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { S3 } from "aws-sdk"
import { InjectAwsService } from "nest-aws-sdk"
import { v4 as uuidv4 } from 'uuid';
import { FileService } from "./file.service"

@Injectable()
export class FileS3UploadService
{
    constructor(
        @InjectAwsService(S3) private s3Service:S3,
        private configService:ConfigService,
    ){}

    async updloadFileToS3(files:Express.Multer.File[]):Promise<Record<string,any>[]>
    {
        return new Promise((resolve,reject)=>{
            Promise.all(files.map((file)=> this.s3Service.upload({
                Bucket:this.configService.get<string>('AWS_SDK_UPLOAD_FILE_BUCKET_NAME'),
                Body:file.buffer,
                Key:`${file.originalname}`
            }).promise()))
            .then((result)=>{
                resolve(result.map((r)=>({
                    url:r.Location,
                    key:r.Key,
                    name:r.Key.split("-")[1],
                    bucket:r.Bucket
                })))
            })
            .catch((error)=>{
                // console.log("Error ",error)
                reject(new InternalServerErrorException())
            })
        })
        
    }
}
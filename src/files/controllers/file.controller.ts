import { Controller, FileTypeValidator, Get, HttpException, HttpStatus, ParseFilePipe, ParseFilePipeBuilder, Post, UnprocessableEntityException, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common"
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import * as path from 'path';
import { FileS3UploadService } from "../services";


@Controller("files")
export class FileController
{
    constructor(private uploadFileService:FileS3UploadService){}


    /**
     * @api {post} /files/upload/
     * @apidescription Upload a PDF or Word document
     * @apiName Upload user
     * @apiGroup Files
     * @apiUse apiSecurity
     * @apiHeader {String} Content-Type=multipart/form-data Allows you to specify that the content of the request is of the multipart/form-data type and is specified by the content-type header.
     * @apiSuccess (201 Created) {Number} statusCode HTTP status code
     * @apiSuccess (201 Created) {String} Response Description
     * 
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiUse apiError
     */
    @Post("upload")
    @UseInterceptors(FilesInterceptor('files',20,{
        fileFilter:(req, file, callback) => {
            let ext = path.extname(file.originalname);
            if (!['.pdf','.doc','.docx'].includes(ext.toLowerCase())) {
              return callback(new UnprocessableEntityException({
                statusCode:HttpStatus.UNPROCESSABLE_ENTITY,
                error:"Unprocessable entity",
                message:['Invalid file type']
            }), false);
            }
          
            return callback(null, true);
          }
    }))
    async uploadFiles(@UploadedFiles() files:Express.Multer.File[])
    {
        try{
            let filesUploaded=await this.uploadFileService.updloadFileToS3(files)
            return {
                statusCode:HttpStatus.CREATED,
                message:"File(s) uploaded successfully",
                data:filesUploaded
            }
        }
        catch(error)
        {
            throw error
        }
        
    }

    

    @Get("dowload/:name")
    async downLoadFile()
    {
        
    }
}
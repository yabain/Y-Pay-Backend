import { Controller,Param,  Get,  HttpStatus,  Post, UnprocessableEntityException,  UploadedFiles, UseInterceptors, UseGuards } from "@nestjs/common"
import {  FilesInterceptor } from "@nestjs/platform-express";
import * as path from 'path';
import { ObjectIDValidationPipe } from "src/shared/pipes";
import { UserJwtAuthGuard } from "src/user/guards";
import { FileService } from "../services";


@Controller("files")
@UseGuards(UserJwtAuthGuard)
export class FileController
{
    constructor(private fileService:FileService){}


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
    @Post("upload/:ticketID")
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
    async uploadFiles(@UploadedFiles() files:Express.Multer.File[], @Param("ticketID", ObjectIDValidationPipe) ticketID:string)
    {
        try{
            let filesUploaded=await this.fileService.uploadFile(files,ticketID)
            // console.log("File ",filesUploaded)
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
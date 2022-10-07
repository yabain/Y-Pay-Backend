import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {MaxLength, MinLength,IsString,IsOptional,IsUrl,IsNotEmpty } from "class-validator";

/**
 * Définition de la documentation du model app
 * @apiDefine CreateAppDTO Body of the request to create a new application
 * @apiBody {String {..65}} name Application name
 * @apiBody {String {..65}} [urlToCallBack] Optional URL to call when updating a financial transaction state from this application
 */
export class CreateAppDTO
{
    @ApiProperty({
        description:"Application name",
        type:String
    })
    @MinLength(5, {
        message: 'Application name is too short',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    name:string;

    @ApiPropertyOptional({
        description:"Url called once the status of a payment change",
        type:String
    })
    @IsOptional()
    @IsUrl({
        message:"UrlToCallBack must be a valid url endpoint"
    })
    @IsString()
    urlToCallBack:string;
}
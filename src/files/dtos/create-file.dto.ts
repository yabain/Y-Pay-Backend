import { IsUrl, IsNotEmpty, IsString } from "class-validator";

export class CreateFileDTO
{
    @IsUrl()
    @IsNotEmpty()
    url:string;

    @IsNotEmpty()
    @IsString()
    key:string;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    bucket:string;
}
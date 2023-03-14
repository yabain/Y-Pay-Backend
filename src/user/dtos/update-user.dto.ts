import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsFQDN, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import { UserSettingDTO } from "./user-setting.dto";

export class UpdateUserDTO extends PartialType(CreateUserDTO){
   
    @IsOptional()
    @IsString()
    @IsUrl()
    coverPicture:string;


    @IsOptional()
    @IsMobilePhone("any")
    whatsappContact:string;

    @IsOptional()
    @MinLength(4)
    @IsString()
    @MaxLength(65)
    skype:string;

    @IsOptional()
    @IsFQDN()
    websiteLink:string;


    @IsOptional()
    @ValidateNested()
    @Type(()=> UserSettingDTO)
    userSetting:UserSettingDTO;
}
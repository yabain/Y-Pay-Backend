import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { MaxLength,MinLength,IsOptional,IsUrl,IsNotEmpty,IsString, Matches, IsMobilePhone } from "class-validator";

/**
 * @apiDefine CreateUserDTO Create user information
 * @apiBody {String {4..65}} firstName user firstname
 * @apiBody {String {4..65}} lastname User lastname
 * @apiBody {String {8..}} password User password
 * @apiBody {String} email User email
 * @apiBody {String} profilePicture User picture
 * @apiBody {String} [country] User country
 * @apiBody {String} [location] User location
 */
export class CreateUserDTO
{
    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(65)
    @IsString()
    firstName:string;

    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    @MaxLength(65)
    lastName:string;

    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    password:string;

    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    @IsString()
    @Matches("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
    email:string;

    @ApiPropertyOptional({
        type:String
    })
    @IsOptional()
    @IsString()
    @IsUrl()
    profilePicture:string;

    @ApiPropertyOptional({
        type:String
    })
    @IsOptional()
    @MinLength(4)
    @IsString()
    country:string;

    @ApiPropertyOptional({
        type:String
    })
    @IsOptional()
    @MinLength(4)
    @IsString()
    location:string;

    @IsOptional()
    @IsMobilePhone("any")
    phoneNumber:string;
}
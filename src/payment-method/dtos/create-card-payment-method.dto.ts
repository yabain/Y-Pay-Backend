import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsOptional, MinLength, IsEmail, IsPhoneNumber, IsPostalCode, Validate, IsCreditCard } from "class-validator";
import { User } from "src/user/models";
import { ExpiredCardValidator, ValidFormatExpirationDateCardValidator } from "../validators";

export class CreateCardPaymentMethodDTO
{
    @ApiProperty({
        description:"Credit Card Number",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @IsCreditCard()
    number:string

    @ApiProperty({
        description:"Card expiry date",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    @Validate(ValidFormatExpirationDateCardValidator)
    @Validate(ExpiredCardValidator)
    expirationDate:string;

    @ApiProperty({
        description:"Credit Card owner",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    ownerName:string;

    @ApiProperty({
        description:"Billing address full name",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    fulnameFacturation:string;

    @ApiPropertyOptional({
        description:"Company of the billing address",
        type:String
    })
    @IsOptional()
    @MinLength(4)
    @IsString()
    companyFacturation:string;

    @ApiProperty({
        description:"Country of the billing address",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    countryFacturation:string;

    @ApiProperty({
        description:"Locality of the billing address",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    addressFacturation:string;

    @ApiProperty({
        description:"billing address city",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    cityFacturation:string;

    @ApiProperty({
        description:"billing address region",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    regionFacturation:string;

    @ApiProperty({
        description:"postal code of billing address",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @IsPostalCode()
    postalCodeFacturation:string;

    @ApiProperty({
        description:"Billing address phone number",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumberFacturation:string;

    @ApiProperty({
        description:"Billing Address Email",
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailFacturation:string;

    owner:User
}
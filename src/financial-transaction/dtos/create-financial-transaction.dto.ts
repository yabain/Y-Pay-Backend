import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {MaxLength,Min,IsEnum,IsNumberString,IsMongoId, MinLength,IsString,IsOptional,IsUrl,IsNotEmpty, IsJSON, IsNumber, IsDefined, IsNotEmptyObject } from "class-validator";
import { Application } from "src/application/models";
import { FinancialTransactionType, PaymentStrategyType, PaymentMoneyCode } from "src/financial-payment/enum";
import { Wallet } from "src/wallet/models";
import { IsValidAmount } from "../decorators/decrease-amount.decorator";
import { FinancialTransactionState } from "../enum";
import { UserRefDTO } from "./user-ref.dto";



export class CreateFinancialTransactionDTO
{

    @ApiProperty({
        type:Number,
        description:"transaction amount"
    })
    @Min(1)
    @IsNumber()
    // @IsValidAmount()
    amount:number;

    @ApiProperty({
        enum:FinancialTransactionType,
        description:"type of financial transaction"
    })
    @IsNotEmpty()
    @IsEnum(FinancialTransactionType)
    type:FinancialTransactionType;
    
    @ApiProperty({
        enum:PaymentStrategyType,
        description:"Payment method"
    })
    @IsNotEmpty()
    @IsEnum(PaymentStrategyType)
    paymentMode:PaymentStrategyType;

    @ApiPropertyOptional({
        enum:FinancialTransactionState,
        description:"Financial transaction status"
    })
    @IsOptional()
    @IsEnum(FinancialTransactionState)
    state:FinancialTransactionState;

    @ApiProperty({
        enum:PaymentMoneyCode,
        description:"Transaction money code"
    })
    @IsEnum(PaymentMoneyCode)
    moneyCode:PaymentMoneyCode;

    @ApiProperty({
        description:"Account information of the person who will send/receive the money",
        type:UserRefDTO,
    })
    @IsDefined()
    @IsNotEmptyObject()
    @Type(()=> UserRefDTO)
    userRef;

    //Invalidate
    application:Application;

    wallet:Wallet;


}
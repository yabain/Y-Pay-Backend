import { PipeTransform, Injectable, ArgumentMetadata,BadRequestException,HttpStatus } from "@nestjs/common";

@Injectable()
export class FinancialTransactionStatePipe implements PipeTransform
{
    transform(value: any, metadata: ArgumentMetadata) {
        if(value=="" || value=="all" || Object.values(FinancialTransactionStatePipe).includes(value)) return value 
        throw new BadRequestException({
            statusCode:HttpStatus.BAD_REQUEST,
            error:"Bad Request",
            message:"the state of the transaction passed as a parameter is invalid"
        })
    }

}
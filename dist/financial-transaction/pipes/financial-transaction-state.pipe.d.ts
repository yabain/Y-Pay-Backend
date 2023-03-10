import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class FinancialTransactionStatePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}

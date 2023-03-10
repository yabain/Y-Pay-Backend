import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { Request } from "express";
import { WalletService } from "src/wallet/services";
export declare class DecreaseAmountValidator implements ValidatorConstraintInterface {
    private readonly request;
    private walletService;
    constructor(request: Request, walletService: WalletService);
    validate(value: number, validationArguments?: ValidationArguments): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments): string;
}

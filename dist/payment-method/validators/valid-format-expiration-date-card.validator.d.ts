import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class ValidFormatExpirationDateCardValidator implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}

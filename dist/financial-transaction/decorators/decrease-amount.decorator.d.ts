import { ValidationOptions } from "class-validator";
export declare function IsValidAmount<T>(validationOption?: ValidationOptions): (object: T, propertyName: string) => void;

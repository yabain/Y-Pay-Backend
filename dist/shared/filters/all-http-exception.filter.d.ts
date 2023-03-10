import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class AllHttpExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}

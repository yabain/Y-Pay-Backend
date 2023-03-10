import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { FinancialTransaction } from "src/financial-transaction/models";
import { PaymentMethodStrategy } from "src/financial-payment/interfaces";
export declare class MtnMoneyStrategyPayment implements PaymentMethodStrategy {
    private configService;
    private readonly httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    token: string;
    getToken(uuid: any): Promise<string>;
    getResponseStatus(response: any): Record<string, any>;
    buy(financialTransaction: FinancialTransaction): Promise<any>;
    check(financialTransaction: FinancialTransaction): Promise<any>;
    cancel(financialTransaction: FinancialTransaction): Promise<any>;
    withdrawal(financialTransaction: FinancialTransaction): Promise<any>;
    checkWithdrawal(financialTransaction: FinancialTransaction): Promise<any>;
}

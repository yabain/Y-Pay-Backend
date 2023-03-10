import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { PaymentMethodStrategy } from "src/financial-payment/interfaces";
import { FinancialTransaction } from "src/financial-transaction/models";
export declare class OrangeMoneyStrategyPayment implements PaymentMethodStrategy {
    private configService;
    private readonly httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    getToken(): Promise<string>;
    buy(financialTransaction: FinancialTransaction): Promise<any>;
    openUserPrompt(financialTransaction: any): void;
    check(financialTransaction: FinancialTransaction): void;
    withdrawal(financialTransaction: FinancialTransaction): void;
    checkWithdrawal(financialTransaction: FinancialTransaction): void;
    cancel(financialTransaction: FinancialTransaction): Promise<any>;
}

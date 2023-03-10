import { PaymentStrategyType } from "../enum";
import { PaymentMethodStrategy } from "../interfaces";
import { MtnMoneyStrategyPayment } from "../strategies/mtn-money";
import { OrangeMoneyStrategyPayment } from "../strategies/orange-money";
export declare class PaymentBuilder {
    private mtnMoneyStrategyPayment;
    private orangeMoneyStrategyPayment;
    constructor(mtnMoneyStrategyPayment: MtnMoneyStrategyPayment, orangeMoneyStrategyPayment: OrangeMoneyStrategyPayment);
    getMethodPayment(method: PaymentStrategyType): PaymentMethodStrategy;
}

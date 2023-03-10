import { PaymentMoneyCode } from "../enum";
export declare class FinanceMoneyConvertorService {
    convertMoneyCodeToUnit(moneyCode: PaymentMoneyCode, amount: number): number;
    convertUnitToMoneyCode(moneyCode: PaymentMoneyCode, amount: number): number;
    convertMoneyInto: any;
}

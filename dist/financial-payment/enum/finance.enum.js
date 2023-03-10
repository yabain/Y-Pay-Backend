"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialTransactionType = exports.PaymentMoneyCode = exports.PaymentStrategyType = void 0;
var PaymentStrategyType;
(function (PaymentStrategyType) {
    PaymentStrategyType["BANK"] = "bank";
    PaymentStrategyType["ORANGE_MONEY"] = "ORANGE";
    PaymentStrategyType["MTN_MONEY"] = "MTN";
    PaymentStrategyType["CREDIT_CARD"] = "credit_card";
})(PaymentStrategyType = exports.PaymentStrategyType || (exports.PaymentStrategyType = {}));
var PaymentMoneyCode;
(function (PaymentMoneyCode) {
    PaymentMoneyCode["XAF"] = "XAF";
    PaymentMoneyCode["FCFA"] = "XAF";
    PaymentMoneyCode["EUR"] = "EUR";
    PaymentMoneyCode["$"] = "$";
})(PaymentMoneyCode = exports.PaymentMoneyCode || (exports.PaymentMoneyCode = {}));
var FinancialTransactionType;
(function (FinancialTransactionType) {
    FinancialTransactionType["DEPOSIT"] = "deposit";
    FinancialTransactionType["WITHDRAW"] = "withdraw";
})(FinancialTransactionType = exports.FinancialTransactionType || (exports.FinancialTransactionType = {}));
//# sourceMappingURL=finance.enum.js.map
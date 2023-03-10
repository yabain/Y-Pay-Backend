"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialPaymentService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../../financial-transaction/enum");
const payment_builder_1 = require("../builder/payment.builder");
const enum_2 = require("../enum");
let FinancialPaymentService = class FinancialPaymentService {
    constructor(paymentBuilder) {
        this.paymentBuilder = paymentBuilder;
    }
    makePaiement(financialTransaction) {
        return new Promise((resolve, reject) => {
            if (!Object.values(enum_2.PaymentStrategyType).includes(financialTransaction.paymentMode))
                return Promise.reject(enum_1.FinancialTransactionErrorType.PAIMENT_METHOD_NOT_FOUND);
            let paymentMethod = financialTransaction.type == enum_2.FinancialTransactionType.DEPOSIT
                ? this.paymentBuilder.getMethodPayment(financialTransaction.paymentMode).buy(financialTransaction)
                : this.paymentBuilder.getMethodPayment(financialTransaction.paymentMode).withdrawal(financialTransaction);
            paymentMethod.then((result) => {
                financialTransaction.state = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                financialTransaction.startDate = new Date().toISOString();
                financialTransaction.error = result.error;
                financialTransaction.endDate = "";
                resolve(financialTransaction);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    checkPaiement(financialTransaction) {
        let r = { endDate: "", error: enum_1.FinancialTransactionErrorType.NO_ERROR, state: enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_START };
        return new Promise((resolve, reject) => {
            let strategyPayment = this.paymentBuilder.getMethodPayment(financialTransaction.paymentMode);
            let checkPromise = financialTransaction.type == enum_2.FinancialTransactionType.DEPOSIT ? strategyPayment.check(financialTransaction) : strategyPayment.checkWithdrawal(financialTransaction);
            checkPromise.then((result) => {
                r = {
                    state: result.status,
                    error: result.error,
                    endDate: result.endDate
                };
                resolve(r);
            })
                .catch((error) => reject(error));
        });
    }
    cancelPaiement(financialTransaction, paiementMethod) {
        throw new Error("Method not implemented.");
    }
};
FinancialPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_builder_1.PaymentBuilder])
], FinancialPaymentService);
exports.FinancialPaymentService = FinancialPaymentService;
//# sourceMappingURL=financial-payment.service.js.map
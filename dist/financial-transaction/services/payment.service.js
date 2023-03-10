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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../../financial-payment/services");
const financial_transaction_service_1 = require("./financial-transaction.service");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const enum_1 = require("../enum");
const services_2 = require("../../wallet/services");
const enum_2 = require("../../financial-payment/enum");
let PaymentService = class PaymentService {
    constructor(paymentService, walletService, financialTransactionService, connection) {
        this.paymentService = paymentService;
        this.walletService = walletService;
        this.financialTransactionService = financialTransactionService;
        this.connection = connection;
    }
    async makePayment(createFinancialTransactionDTO, appID) {
        const transaction = await this.connection.startSession();
        transaction.startTransaction();
        let financialTransaction = null;
        try {
            financialTransaction = await this.financialTransactionService.create(createFinancialTransactionDTO, appID, transaction);
            financialTransaction = await this.financialTransactionService.update({ _id: financialTransaction._id }, await this.paymentService.makePaiement(financialTransaction), transaction);
            await transaction.commitTransaction();
        }
        catch (err) {
            await transaction.abortTransaction();
            console.log("Error ", err);
            throw err;
        }
        finally {
            transaction.endSession();
        }
        return financialTransaction;
    }
    async checkPayment(financialTransactionRef) {
        let transaction = await this.connection.startSession(), financialTransaction = null;
        transaction.startTransaction();
        try {
            financialTransaction = await this.financialTransactionService.findOneByField({ ref: financialTransactionRef });
            if (!financialTransaction)
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: `Transaction id ${financialTransactionRef} not found`
                });
            if (financialTransaction.state == enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR || financialTransaction.state == enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS)
                return financialTransaction;
            financialTransaction = await this.financialTransactionService.update({ _id: financialTransaction._id }, await this.paymentService.checkPaiement(financialTransaction), transaction);
            await this.updateWallet(financialTransaction, transaction);
            await transaction.commitTransaction();
        }
        catch (err) {
            await transaction.abortTransaction();
            throw err;
        }
        finally {
            transaction.endSession();
        }
        return financialTransaction;
    }
    async updateWallet(financialTransaction, transaction = null) {
        if (financialTransaction.type == enum_2.FinancialTransactionType.DEPOSIT)
            await this.walletService.increaseWallet(financialTransaction.wallet._id, financialTransaction.amount, transaction);
        else
            await this.walletService.decreaseWallet(financialTransaction.wallet._id, financialTransaction.amount, transaction);
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [services_1.FinancialPaymentService,
        services_2.WalletService,
        financial_transaction_service_1.FinancialTransactionService, mongoose_1.default.Connection])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map
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
exports.FinancialTransactionSchema = exports.FinancialTransaction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const enum_1 = require("../enum");
const models_1 = require("../../application/models");
const models_2 = require("../../wallet/models");
const enum_2 = require("../../financial-payment/enum");
let FinancialTransaction = class FinancialTransaction {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enum_1.FinancialTransactionState, default: enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_START }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date, default: Date.now }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date, default: Date.now }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enum_2.FinancialTransactionType, default: enum_2.FinancialTransactionType.DEPOSIT }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "ref", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enum_1.FinancialTransactionErrorType, default: enum_1.FinancialTransactionErrorType.NO_ERROR }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "error", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enum_2.PaymentStrategyType, default: enum_2.PaymentStrategyType.BANK }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "paymentMode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: models_1.Application.name, required: true }),
    __metadata("design:type", models_1.Application)
], FinancialTransaction.prototype, "application", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enum_2.PaymentMoneyCode, default: enum_2.PaymentMoneyCode.XAF }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "moneyCode", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        fullName: { type: String },
        account: { type: Object }
    })),
    __metadata("design:type", Object)
], FinancialTransaction.prototype, "userRef", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: models_2.Wallet.name, required: true }),
    __metadata("design:type", models_2.Wallet)
], FinancialTransaction.prototype, "wallet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now(), required: true }),
    __metadata("design:type", Date)
], FinancialTransaction.prototype, "createdAt", void 0);
FinancialTransaction = __decorate([
    (0, mongoose_1.Schema)({
        toObject: {
            transform: function (doc, ret) {
                delete ret.token;
                ret.wallet = ret.wallet._id;
                ret.application = ret.application._id;
                delete ret.__v;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                delete ret.token;
                ret.wallet = ret.wallet._id;
                ret.application = ret.application._id;
                delete ret.__v;
            }
        }
    })
], FinancialTransaction);
exports.FinancialTransaction = FinancialTransaction;
exports.FinancialTransactionSchema = mongoose_1.SchemaFactory.createForClass(FinancialTransaction);
//# sourceMappingURL=financial-transaction.schema.js.map
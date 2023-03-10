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
exports.CreateFinancialTransactionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../financial-payment/enum");
const enum_2 = require("../enum");
const user_ref_dto_1 = require("./user-ref.dto");
class CreateFinancialTransactionDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "transaction amount"
    }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFinancialTransactionDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_1.FinancialTransactionType,
        description: "type of financial transaction"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enum_1.FinancialTransactionType),
    __metadata("design:type", String)
], CreateFinancialTransactionDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_1.PaymentStrategyType,
        description: "Payment method"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enum_1.PaymentStrategyType),
    __metadata("design:type", String)
], CreateFinancialTransactionDTO.prototype, "paymentMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enum_2.FinancialTransactionState,
        description: "Financial transaction status"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_2.FinancialTransactionState),
    __metadata("design:type", String)
], CreateFinancialTransactionDTO.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_1.PaymentMoneyCode,
        description: "Transaction money code"
    }),
    (0, class_validator_1.IsEnum)(enum_1.PaymentMoneyCode),
    __metadata("design:type", String)
], CreateFinancialTransactionDTO.prototype, "moneyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Account information of the person who will send/receive the money",
        type: user_ref_dto_1.UserRefDTO,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => user_ref_dto_1.UserRefDTO),
    __metadata("design:type", Object)
], CreateFinancialTransactionDTO.prototype, "userRef", void 0);
exports.CreateFinancialTransactionDTO = CreateFinancialTransactionDTO;
//# sourceMappingURL=create-financial-transaction.dto.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FinancialTransactionStatePipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialTransactionStatePipe = void 0;
const common_1 = require("@nestjs/common");
let FinancialTransactionStatePipe = FinancialTransactionStatePipe_1 = class FinancialTransactionStatePipe {
    transform(value, metadata) {
        if (value == "" || value == "all" || Object.values(FinancialTransactionStatePipe_1).includes(value))
            return value;
        throw new common_1.BadRequestException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: "Bad Request",
            message: "the state of the transaction passed as a parameter is invalid"
        });
    }
};
FinancialTransactionStatePipe = FinancialTransactionStatePipe_1 = __decorate([
    (0, common_1.Injectable)()
], FinancialTransactionStatePipe);
exports.FinancialTransactionStatePipe = FinancialTransactionStatePipe;
//# sourceMappingURL=financial-transaction-state.pipe.js.map
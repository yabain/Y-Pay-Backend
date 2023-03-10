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
exports.PaymentBuilder = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../enum");
const mtn_money_1 = require("../strategies/mtn-money");
const orange_money_1 = require("../strategies/orange-money");
let PaymentBuilder = class PaymentBuilder {
    constructor(mtnMoneyStrategyPayment, orangeMoneyStrategyPayment) {
        this.mtnMoneyStrategyPayment = mtnMoneyStrategyPayment;
        this.orangeMoneyStrategyPayment = orangeMoneyStrategyPayment;
    }
    getMethodPayment(method) {
        let paiementMethodStrategi;
        switch (method) {
            case enum_1.PaymentStrategyType.MTN_MONEY:
                paiementMethodStrategi = this.mtnMoneyStrategyPayment;
                break;
            case enum_1.PaymentStrategyType.ORANGE_MONEY:
                paiementMethodStrategi = this.orangeMoneyStrategyPayment;
                break;
        }
        return paiementMethodStrategi;
    }
};
PaymentBuilder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mtn_money_1.MtnMoneyStrategyPayment,
        orange_money_1.OrangeMoneyStrategyPayment])
], PaymentBuilder);
exports.PaymentBuilder = PaymentBuilder;
//# sourceMappingURL=payment.builder.js.map
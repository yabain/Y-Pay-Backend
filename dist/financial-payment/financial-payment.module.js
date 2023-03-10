"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialPaymentModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const payment_builder_1 = require("./builder/payment.builder");
const services_1 = require("./services");
const mtn_money_1 = require("./strategies/mtn-money");
const orange_money_1 = require("./strategies/orange-money");
let FinancialPaymentModule = class FinancialPaymentModule {
};
FinancialPaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule
        ],
        providers: [
            services_1.FinancialPaymentService,
            mtn_money_1.MtnMoneyStrategyPayment,
            orange_money_1.OrangeMoneyStrategyPayment,
            payment_builder_1.PaymentBuilder,
        ],
        exports: [services_1.FinancialPaymentService]
    })
], FinancialPaymentModule);
exports.FinancialPaymentModule = FinancialPaymentModule;
//# sourceMappingURL=financial-payment.module.js.map
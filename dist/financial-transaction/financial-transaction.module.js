"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialTransactionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const application_module_1 = require("../application/application.module");
const financial_payment_module_1 = require("../financial-payment/financial-payment.module");
const wallet_module_1 = require("../wallet/wallet.module");
const controllers_1 = require("./controllers");
const models_1 = require("./models");
const services_1 = require("./services");
const validators_1 = require("./validators");
let FinancialTransactionModule = class FinancialTransactionModule {
};
FinancialTransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: models_1.FinancialTransaction.name, schema: models_1.FinancialTransactionSchema }]),
            application_module_1.ApplicationModule,
            financial_payment_module_1.FinancialPaymentModule,
            wallet_module_1.WalletModule
        ],
        controllers: [controllers_1.PaymentController],
        providers: [
            services_1.FinancialTransactionService,
            services_1.PaymentService,
            validators_1.DecreaseAmountValidator
        ]
    })
], FinancialTransactionModule);
exports.FinancialTransactionModule = FinancialTransactionModule;
//# sourceMappingURL=financial-transaction.module.js.map
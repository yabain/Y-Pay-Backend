"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const application_module_1 = require("./application/application.module");
const financial_transaction_module_1 = require("./financial-transaction/financial-transaction.module");
const payment_method_module_1 = require("./payment-method/payment-method.module");
const shared_module_1 = require("./shared/shared.module");
const user_module_1 = require("./user/user.module");
const activity_module_1 = require("./activity/activity.module");
const file_module_1 = require("./files/file.module");
const ticket_module_1 = require("./ticket/ticket.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            application_module_1.ApplicationModule,
            user_module_1.UserModule,
            financial_transaction_module_1.FinancialTransactionModule,
            payment_method_module_1.PaymentMethodModule,
            activity_module_1.ActivityModule,
            file_module_1.FileModule,
            ticket_module_1.TicketModule
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
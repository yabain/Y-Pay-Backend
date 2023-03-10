"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const security_1 = require("../shared/security");
const shared_module_1 = require("../shared/shared.module");
const user_module_1 = require("../user/user.module");
const payment_method_controller_1 = require("./controllers/payment-method.controller");
const models_1 = require("./models");
const services_1 = require("./services");
let PaymentMethodModule = class PaymentMethodModule {
};
PaymentMethodModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            payment_method_controller_1.PaymentMethodController
        ],
        imports: [
            shared_module_1.SharedModule,
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    imports: [shared_module_1.SharedModule],
                    name: models_1.CardMethodPayment.name,
                    useFactory: (encryptionSecurityService) => {
                        const schema = models_1.CardMethodPaymentSchema;
                        schema.pre("save", function (next) {
                            this.number = encryptionSecurityService.cipher(this.number);
                            next();
                        });
                        return schema;
                    },
                    inject: [security_1.EncryptionSecurityService]
                }
            ]),
            user_module_1.UserModule
        ],
        providers: [
            services_1.CardPaymentMethodService
        ],
        exports: []
    })
], PaymentMethodModule);
exports.PaymentMethodModule = PaymentMethodModule;
//# sourceMappingURL=payment-method.module.js.map
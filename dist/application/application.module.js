"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const activity_module_1 = require("../activity/activity.module");
const ticket_module_1 = require("../ticket/ticket.module");
const user_module_1 = require("../user/user.module");
const wallet_module_1 = require("../wallet/wallet.module");
const controllers_1 = require("./controllers");
const models_1 = require("./models");
const services_1 = require("./services");
const stategies_1 = require("./stategies");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: models_1.Application.name, schema: models_1.ApplicationSchema }]),
            user_module_1.UserModule,
            wallet_module_1.WalletModule,
            passport_1.PassportModule,
            activity_module_1.ActivityModule,
            (0, common_1.forwardRef)(() => ticket_module_1.TicketModule)
        ],
        controllers: [controllers_1.ApplicationController, controllers_1.AuthController],
        providers: [services_1.ApplicationService, stategies_1.BasicStrategy, services_1.AuthService],
        exports: [services_1.ApplicationService, stategies_1.BasicStrategy, services_1.AuthService]
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application.module.js.map
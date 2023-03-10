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
exports.DecreaseAmountValidator = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const services_1 = require("../../wallet/services");
let DecreaseAmountValidator = class DecreaseAmountValidator {
    constructor(request, walletService) {
        this.request = request;
        this.walletService = walletService;
    }
    async validate(value, validationArguments) {
        let appId = this.request.user["userId"];
        let wallet = await this.walletService.findOneByField({ "application": appId });
        return wallet.amount >= value;
    }
    defaultMessage(validationArguments) {
        return `Wallet amount is less than transaction amount`;
    }
};
DecreaseAmountValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsValidAmount', async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, services_1.WalletService])
], DecreaseAmountValidator);
exports.DecreaseAmountValidator = DecreaseAmountValidator;
//# sourceMappingURL=decrease-amount.validator.js.map
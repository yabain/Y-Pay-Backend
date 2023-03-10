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
exports.PaymentMethodController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pipes_1 = require("../../shared/pipes");
const guards_1 = require("../../user/guards");
const create_card_payment_method_dto_1 = require("../dtos/create-card-payment-method.dto");
const services_1 = require("../services");
let PaymentMethodController = class PaymentMethodController {
    constructor(cardPaymentMethodService) {
        this.cardPaymentMethodService = cardPaymentMethodService;
    }
    async addCardPaymentMethod(request, createCardPaymentMethodDTO) {
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "The new payment card has been successfully added",
            data: await this.cardPaymentMethodService.create(createCardPaymentMethodDTO, request.user)
        };
    }
    async addMobilePaymentMethod() {
    }
    async deletePaymentMethod(id) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "The payment card has been successfully deleted",
            data: await this.cardPaymentMethodService.delete(id)
        };
    }
};
__decorate([
    (0, common_1.Post)("card"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_card_payment_method_dto_1.CreateCardPaymentMethodDTO]),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "addCardPaymentMethod", null);
__decorate([
    (0, common_1.Post)("mobile"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "addMobilePaymentMethod", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id", pipes_1.ObjectIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "deletePaymentMethod", null);
PaymentMethodController = __decorate([
    (0, swagger_1.ApiTags)("Payment Method"),
    (0, common_1.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.UseGuards)(guards_1.EmailConfirmedGuard),
    (0, common_1.Controller)("payment-method"),
    __metadata("design:paramtypes", [services_1.CardPaymentMethodService])
], PaymentMethodController);
exports.PaymentMethodController = PaymentMethodController;
//# sourceMappingURL=payment-method.controller.js.map
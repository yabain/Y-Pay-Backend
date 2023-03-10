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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../application/guards");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async makePayment(request, createFinancialTransactionDTO) {
        let data = await this.paymentService.makePayment(createFinancialTransactionDTO, request.user["userId"]);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "Payment initiated with success",
            data
        };
    }
    async checkPayment(request, ref) {
        let data = await this.paymentService.checkPayment(ref);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Payment details",
            data
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Post)("pay"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.CreateFinancialTransactionDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "makePayment", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Get)("check/:ref"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("ref", new common_1.ParseUUIDPipe({ version: "4" }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "checkPayment", null);
PaymentController = __decorate([
    (0, swagger_1.ApiTags)("Payment"),
    (0, common_1.Controller)("payment"),
    __metadata("design:paramtypes", [services_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map
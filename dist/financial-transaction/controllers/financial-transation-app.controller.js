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
exports.FinancialTransactionAppController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../user/guards");
const pipes_1 = require("../pipes");
let FinancialTransactionAppController = class FinancialTransactionAppController {
    constructor() { }
    async getTransactionByParam(state) {
    }
};
__decorate([
    (0, common_1.Get)(":state"),
    __param(0, (0, common_1.Param)("state", pipes_1.FinancialTransactionStatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinancialTransactionAppController.prototype, "getTransactionByParam", null);
FinancialTransactionAppController = __decorate([
    (0, common_1.Controller)("transaction/app"),
    (0, common_1.UseGuards)(guards_1.EmailConfirmedGuard),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __metadata("design:paramtypes", [])
], FinancialTransactionAppController);
exports.FinancialTransactionAppController = FinancialTransactionAppController;
//# sourceMappingURL=financial-transation-app.controller.js.map
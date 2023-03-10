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
exports.FinancialTransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const services_1 = require("../../application/services");
const services_2 = require("../../wallet/services");
const models_1 = require("../models");
let FinancialTransactionService = class FinancialTransactionService {
    constructor(financialTransactionModel, connection, applicationService, walletService) {
        this.financialTransactionModel = financialTransactionModel;
        this.connection = connection;
        this.applicationService = applicationService;
        this.walletService = walletService;
    }
    async create(createFinancialTransactionDTO, appClientID, session) {
        createFinancialTransactionDTO.application = await this.applicationService.findOneByField({ _id: appClientID });
        createFinancialTransactionDTO.wallet = await this.walletService.findOneByField({ application: appClientID });
        return new this.financialTransactionModel(createFinancialTransactionDTO).save({ session });
    }
    async findAll() {
        return this.financialTransactionModel.find().sort({ createdAt: 1 }).exec();
    }
    async findByField(userObj) {
        return this.financialTransactionModel.find(userObj).sort({ createdAt: 1 }).exec();
    }
    async findOneByField(userObj) {
        return this.financialTransactionModel.findOne(userObj).exec();
    }
    async update(filter, toUpdate, session = null) {
        return this.financialTransactionModel.findOneAndUpdate(filter, toUpdate, { session, new: true });
    }
};
FinancialTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.FinancialTransaction.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.default.Connection, services_1.ApplicationService,
        services_2.WalletService])
], FinancialTransactionService);
exports.FinancialTransactionService = FinancialTransactionService;
//# sourceMappingURL=financial-transaction.service.js.map
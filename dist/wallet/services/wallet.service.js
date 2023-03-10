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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let WalletService = class WalletService {
    constructor(walletModel) {
        this.walletModel = walletModel;
    }
    getInstance(jsonObj) {
        return new this.walletModel(jsonObj);
    }
    async update(filter, toUpdate, session = null) {
        return this.walletModel.findOneAndUpdate(filter, toUpdate, { session, new: true });
    }
    create(user, application, transaction = null) {
        return new this.walletModel({
            amount: 0,
            owner: user,
            app: application
        }).save({ session: transaction });
    }
    async findOneByField(walletObj) {
        return this.walletModel.findOne(walletObj).exec();
    }
    async increaseWallet(walletID, amount, session = null) {
        let wallet = await this.findOneByField({ "_id": walletID });
        return this.update({ "_id": walletID }, { amount: wallet.amount + amount }, session);
    }
    async decreaseWallet(walletID, amount, session = null) {
        let wallet = await this.findOneByField({ "_id": walletID });
        if (wallet.amount < amount)
            return null;
        return this.update({ "_id": walletID }, { amount: wallet.amount - amount }, session);
    }
    async findByField(walletObj) {
        return this.walletModel.find(walletObj).sort({ createdAt: 1 }).exec();
    }
    async findListWalletByOwner(userID) {
        return this.findByField({ isDeleted: false, owner: userID });
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Wallet')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map
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
exports.CardPaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const services_1 = require("../../user/services");
const models_1 = require("../models");
let CardPaymentMethodService = class CardPaymentMethodService {
    constructor(cardMethodPaymentModel, usersService, connection) {
        this.cardMethodPaymentModel = cardMethodPaymentModel;
        this.usersService = usersService;
        this.connection = connection;
    }
    async create(createCardPaymentMethodDTO, user) {
        createCardPaymentMethodDTO.owner = await this.usersService.findOneByField({ email: user.email });
        if (!createCardPaymentMethodDTO.owner)
            throw new common_1.NotFoundException();
        return await new this.cardMethodPaymentModel(createCardPaymentMethodDTO).save();
    }
    async update(filter, toUpdate, session = null) {
        return this.cardMethodPaymentModel.findOneAndUpdate(filter, toUpdate, { session, new: true });
    }
    async delete(cardPaymentID) {
        return this.update({ "_id": cardPaymentID }, { isDeleted: true });
    }
};
CardPaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.CardMethodPayment.name)),
    __param(2, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        services_1.UsersService, mongoose_2.default.Connection])
], CardPaymentMethodService);
exports.CardPaymentMethodService = CardPaymentMethodService;
//# sourceMappingURL=card-payment-method.service.js.map
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
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const services_1 = require("../../user/services");
const services_2 = require("../../wallet/services");
const models_1 = require("../models");
let ApplicationService = class ApplicationService {
    constructor(appModel, walletService, usersService, connection) {
        this.appModel = appModel;
        this.walletService = walletService;
        this.usersService = usersService;
        this.connection = connection;
    }
    getInstance(jsonObj) {
        return new this.appModel(jsonObj);
    }
    async create(createappDTO, user) {
        const transaction = await this.connection.startSession();
        transaction.startTransaction();
        let wallet = null, appDocument = null;
        try {
            let app = new models_1.Application();
            app.name = createappDTO.name;
            if (createappDTO.urlToCallBack)
                app.urlToCallBack = createappDTO.urlToCallBack;
            app.owner = await this.usersService.findOneByField({ email: user.email });
            if (!app.owner)
                throw new common_1.NotFoundException();
            appDocument = await new this.appModel(app).save({ session: transaction });
            wallet = await this.walletService.create(app.owner, appDocument, transaction);
            await transaction.commitTransaction();
        }
        catch (err) {
            await transaction.abortTransaction();
            throw err;
        }
        finally {
            transaction.endSession();
        }
        return { app: appDocument, wallet };
    }
    async findAll() {
        return this.findByField({});
    }
    async findByField(appObj) {
        return this.appModel.find(appObj).sort({ createdAt: 1 }).exec();
    }
    async findOneByField(appObj) {
        return this.appModel.findOne(appObj).exec();
    }
    async findListAppByOwner(userID) {
        let wallets = await this.walletService.findListWalletByOwner(userID);
        let apps = await Promise.all(wallets.map((wallet) => this.findOneByField({ "_id": wallet.app })));
        return wallets.map((wallet) => ({ wallet, app: apps.find((app) => app["_id"].toString() == wallet.app["_id"].toString()) }));
    }
};
ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Application.name)),
    __param(3, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        services_2.WalletService,
        services_1.UsersService, mongoose_2.default.Connection])
], ApplicationService);
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map
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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const services_1 = require("../../application/services");
const services_2 = require("../../user/services");
const models_1 = require("../models");
let TicketService = class TicketService {
    constructor(ticketModel, userService, appService) {
        this.ticketModel = ticketModel;
        this.userService = userService;
        this.appService = appService;
    }
    async create(createTicketDTO, user) {
        createTicketDTO.owner = await this.userService.findOneByField({ "email": user.email });
        if (createTicketDTO.app) {
            let app = await this.appService.findOneByField({ _id: createTicketDTO.app });
            if (!app)
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    error: "Not Found",
                    message: ["the application whose identifier was not found"]
                });
            createTicketDTO.app = app;
        }
        return new this.ticketModel(createTicketDTO).save();
    }
    async findAll() {
        return this.findByField({});
    }
    async findByField(ticketObj) {
        return this.ticketModel.find(ticketObj).sort({ createdAt: 1 }).exec();
    }
    async findOneByField(ticketObj) {
        return this.ticketModel.findOne(ticketObj).exec();
    }
    async findListTicketByOwner(userID) {
        return this.findByField({ owner: userID });
    }
    async findListTicketByStateAndOwner(userId, state) {
        return this.findByField({ owner: userId, state });
    }
    async findTicketByRef(ref) {
        return this.findByField({ refNumber: ref });
    }
    async update(filter, toUpdate, session = null) {
        return this.ticketModel.findOneAndUpdate(filter, toUpdate, { session, new: true });
    }
    addFile(filter, files, session = null) {
        return this.update(filter, { $push: { files } }, session);
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Ticket.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        services_2.UsersService,
        services_1.ApplicationService])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map
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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enum_1 = require("../../user/enum");
const services_1 = require("../../user/services");
const models_1 = require("../models");
const ticket_service_1 = require("./ticket.service");
let MessageService = class MessageService {
    constructor(messageModel, usersService, ticketService) {
        this.messageModel = messageModel;
        this.usersService = usersService;
        this.ticketService = ticketService;
    }
    async create(message, userObj) {
        if (message.from) {
            message.from = await this.usersService.findOneByField({ "_id": message.from });
            if (!message.from)
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    error: "Not Found",
                    message: ["The sender of the message was not found"]
                });
        }
        else {
            let user = await this.usersService.findOneByField({ "email": userObj.email });
            if (user.permissions == enum_1.PERMISSIONS.USER)
                message.from = user;
        }
        if (message.to) {
            message.to = await this.usersService.findOneByField({ "_id": message.to });
            if (!message.to)
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    error: "Not Found",
                    message: ["The recipient of the message was not found"]
                });
        }
        message.ticket = await this.ticketService.findOneByField({ "_id": message.ticket });
        if (!message.ticket)
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                error: "Not Found",
                message: ["The ticket was not found"]
            });
        return new this.messageModel(message).save();
    }
    async findAll() {
        return this.findByField({});
    }
    async findByField(messageObj) {
        return this.messageModel.find(messageObj).sort({ createdAt: 1 }).exec();
    }
    async findOneByField(messageObj) {
        return this.messageModel.findOne(messageObj).exec();
    }
    async findListMessageByTicket(ticketID) {
        let ticket = await this.ticketService.findOneByField({ "_id": new mongoose_2.default.Types.ObjectId(ticketID) });
        if (!ticket)
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                error: "Not Found",
                message: ["The ticket was not found"]
            });
        return this.findByField({ ticket: new mongoose_2.default.Types.ObjectId(ticketID) });
    }
    async update(filter, toUpdate, session = null) {
        return this.messageModel.findOneAndUpdate(filter, toUpdate, { session, new: true });
    }
    async getLastUnreadMessage(ticketID) {
        return this.findByField({ ticket: ticketID, isRead: false });
    }
    async markMessageAsRead(messageID, session = null) {
        return this.update({ '_id': new mongoose_2.default.Types.ObjectId(messageID) }, { isRead: true }, session);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        services_1.UsersService,
        ticket_service_1.TicketService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
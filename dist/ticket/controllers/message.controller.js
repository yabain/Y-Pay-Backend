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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const pipes_1 = require("../../shared/pipes");
const guards_1 = require("../../user/guards");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async newMessage(createMessageDTO, request) {
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "New message saved successfully",
            data: await this.messageService.create(createMessageDTO, request.user)
        };
    }
    async getMessage(ticketID) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "List of messages found",
            data: await this.messageService.findListMessageByTicket(ticketID)
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateMessageDTO, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "newMessage", null);
__decorate([
    (0, common_1.Get)("/ticket/:ticketID"),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __param(0, (0, common_1.Param)("ticketID", pipes_1.ObjectIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessage", null);
MessageController = __decorate([
    (0, common_1.Controller)("message"),
    __metadata("design:paramtypes", [services_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map
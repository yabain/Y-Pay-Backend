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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const pipes_1 = require("../../shared/pipes");
const guards_1 = require("../../user/guards");
const create_ticket_dto_1 = require("../dtos/create-ticket.dto");
const services_1 = require("../services");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async createTicket(createTicketDTO, request) {
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "The ticket was successfully created",
            data: await this.ticketService.create(createTicketDTO, request.user)
        };
    }
    async getTicketById(id) {
        let ticket = await this.ticketService.findOneByField({ "_id": id });
        if (!ticket)
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "ticket not found",
                error: ["Not Found"]
            });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "ticket found",
            data: ticket
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDTO, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __param(0, (0, common_1.Param)('id', pipes_1.ObjectIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTicketById", null);
TicketController = __decorate([
    (0, common_1.Controller)("ticket"),
    __metadata("design:paramtypes", [services_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map
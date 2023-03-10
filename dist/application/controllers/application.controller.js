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
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const services_1 = require("../../activity/services");
const pipes_1 = require("../../shared/pipes");
const dtos_1 = require("../../ticket/dtos");
const services_2 = require("../../ticket/services");
const guards_1 = require("../../user/guards");
const dtos_2 = require("../dtos");
const services_3 = require("../services");
let ApplicationController = class ApplicationController {
    constructor(appService, appAuthService, activityLogger, tiketService, messageService) {
        this.appService = appService;
        this.appAuthService = appAuthService;
        this.activityLogger = activityLogger;
        this.tiketService = tiketService;
        this.messageService = messageService;
    }
    async createApp(request, createAppDTO) {
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "The application was created successfully",
            data: await this.appService.create(createAppDTO, request.user)
        };
    }
    async getAppList(request) {
        return {
            statusCode: common_1.HttpStatus.OK,
            messae: "List of apps",
            data: await this.appService.findListAppByOwner(request.user["userId"])
        };
    }
    async goToProd(appID, request) {
        let app = await this.appService.findOneByField({ _id: new mongoose_1.default.Types.ObjectId(appID) });
        let ticketDTO = new dtos_1.CreateTicketDTO();
        ticketDTO.app = appID;
        ticketDTO.title = `Request for production of the application named ${app.name}`;
        let ticket = await this.tiketService.create(ticketDTO, request.user);
        let messageDTO = new dtos_1.CreateMessageDTO();
        messageDTO.ticket = ticket._id.toString();
        messageDTO.to = request.user["userId"];
        messageDTO.content = `
        Hello <br/>,
        You have requested the production of your product ${app.name}. to complete these steps, please send the following items through this channel:
        <ol>
        <li>Your company's commercial register</li>
        <li>A description of your project</li>
        </ol>             
        Sincerely<br/>
        Y-Nkap Cameroon<br>
        <a href="mailto:support@y-nkap.com">support@y-nkap.com</a>`;
        let message = await this.messageService.create(messageDTO, request.user);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "Launch process to prod mode completed successfully",
            data: { message, ticket }
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_2.CreateAppDTO]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "createApp", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getAppList", null);
__decorate([
    (0, common_1.Get)("ask-prod/:appID"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __param(0, (0, common_1.Param)("appID", pipes_1.ObjectIDValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "goToProd", null);
ApplicationController = __decorate([
    (0, common_1.Controller)("apps"),
    __metadata("design:paramtypes", [services_3.ApplicationService,
        services_3.AuthService,
        services_1.ActivityLoggerService,
        services_2.TicketService,
        services_2.MessageService])
], ApplicationController);
exports.ApplicationController = ApplicationController;
//# sourceMappingURL=application.controller.js.map
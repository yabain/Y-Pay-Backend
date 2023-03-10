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
exports.EmailConfirmationController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../dtos");
const guards_1 = require("../guards");
const services_1 = require("../services");
const user_email_service_1 = require("../services/user-email.service");
let EmailConfirmationController = class EmailConfirmationController {
    constructor(userEmailService, userService) {
        this.userEmailService = userEmailService;
        this.userService = userService;
    }
    async sendEmailConfirmation(emailDTO) {
        let user = await this.userService.findOneByField({ "email": emailDTO.email });
        if (!user)
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                error: "NotFound",
                message: ["User not found"]
            });
        await this.userEmailService.sendConfirmationEmail(user);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Account confirmation email has been sent",
        };
    }
    async confirmEmail(request) {
        let user = await this.userService.findOneByField({ "email": request.user["email"] });
        if (!user)
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                error: "NotFound",
                message: ["User not found"]
            });
        if (user.emailConfirmed)
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                error: "EmailConfirmationForbidden",
                message: "The email has already been confirmed"
            });
        await this.userService.confirmedAccount(user);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "The email has been successfully confirmed",
        };
    }
};
__decorate([
    (0, common_1.Get)("send-confirmation"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ConfirmationEmailDTO]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "sendEmailConfirmation", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    (0, common_1.Post)("confirm"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "confirmEmail", null);
EmailConfirmationController = __decorate([
    (0, common_1.Controller)("email"),
    __metadata("design:paramtypes", [user_email_service_1.UserEmailService,
        services_1.UsersService])
], EmailConfirmationController);
exports.EmailConfirmationController = EmailConfirmationController;
//# sourceMappingURL=email-confirmation.controller.js.map
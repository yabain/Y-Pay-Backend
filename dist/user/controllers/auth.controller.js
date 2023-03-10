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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_1 = require("../../activity/services");
const dtos_1 = require("../dtos");
const guards_1 = require("../guards");
const services_2 = require("../services");
const user_email_service_1 = require("../services/user-email.service");
const utils_1 = require("../utils");
let AuthController = class AuthController {
    constructor(usersService, authService, userEmailService, activityLogService) {
        this.usersService = usersService;
        this.authService = authService;
        this.userEmailService = userEmailService;
        this.activityLogService = activityLogService;
    }
    async register(createUserDTO) {
        let userCreated = await this.usersService.create(createUserDTO);
        await this.userEmailService.sendNewUserEmail(userCreated);
        await this.userEmailService.sendConfirmationEmail(userCreated);
        await this.activityLogService.logActivity({
            owner: userCreated,
            description: "New account created"
        });
        return {
            statusCode: 201,
            message: "User Created",
            data: userCreated
        };
    }
    async login(request) {
        let data = this.authService.login(request.user);
        await this.activityLogService.logActivity({
            owner: request.user,
            description: "New User Authentication"
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Authentication Success",
            data: Object.assign(Object.assign({}, data), { user: request.user })
        };
    }
    async refreshToken() {
    }
    async logout() {
    }
    async resetPassword(request, resetPasswordDTO) {
        await this.usersService.update({ "email": request.user["email"] }, { password: utils_1.PasswordUtil.hash(resetPasswordDTO.password) });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Password updated successfully"
        };
    }
    async sendResetPasswordMail(emailDTO) {
        let data = await this.usersService.findOneByField({ "email": emailDTO.email });
        if (!data)
            throw new common_1.NotFoundException({
                statusCode: 404,
                error: "NotFound",
                message: ["User not found"]
            });
        await this.userEmailService.sendResetPasswordEmail(data);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "password reset link sent by email with success"
        };
    }
};
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.EmailConfirmedGuard),
    (0, common_1.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    (0, common_1.UseGuards)(guards_1.EmailConfirmedGuard),
    (0, common_1.Get)("refresh"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    (0, common_1.UseGuards)(guards_1.EmailConfirmedGuard),
    (0, common_1.Get)("logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    (0, common_1.Put)("reset-password"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)("reset-password-link"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ConfirmationEmailDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendResetPasswordMail", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("User Authentification"),
    (0, common_1.Controller)("user/auth"),
    __metadata("design:paramtypes", [services_2.UsersService,
        services_2.AuthService,
        user_email_service_1.UserEmailService,
        services_1.ActivityLoggerService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
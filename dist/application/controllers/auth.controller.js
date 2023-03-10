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
const auth_basic_guard_1 = require("../guards/auth-basic.guard");
const services_1 = require("../services");
let AuthController = class AuthController {
    constructor(appService, appAuthService) {
        this.appService = appService;
        this.appAuthService = appAuthService;
    }
    async authApp(request) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Authentication Success",
            data: this.appAuthService.createApiKey(request.user)
        };
    }
};
__decorate([
    (0, common_1.Get)('token'),
    (0, common_1.UseGuards)(auth_basic_guard_1.AuthBasicGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authApp", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("Application"),
    (0, common_1.Controller)("apps/auth"),
    __metadata("design:paramtypes", [services_1.ApplicationService, services_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const emails_1 = require("../../shared/services/emails");
let UserEmailService = class UserEmailService {
    constructor(emailService, configService, jwtService) {
        this.emailService = emailService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async sendNewUserEmail(user) {
        return this.sendTemplateEmail(this.configService.get("TEAM_EMAIL_SENDER"), user.email, this.configService.get("EMAIL_TEMPLATE_NEW_REGISTRATION"), {
            userEmail: `${user.firstName} ${user.lastName}`,
        });
    }
    async sendConfirmationEmail(user) {
        const accessToken = this.jwtService.sign({
            email: user.email,
            permissions: [user.permissions],
            sub: user._id
        });
        return this.sendTemplateEmail(this.configService.get("NO_REPLY_EMAIL_SENDER"), user.email, this.configService.get("EMAIL_TEMPLATE_ACCOUNT_CONFIRMATION"), {
            userEmail: `${user.firstName} ${user.lastName}`,
            confirmationLink: `${this.configService.get("PUBLIC_FRONTEND_URL")}/mail/link-receive?token=${accessToken}`
        });
    }
    async sendResetPasswordEmail(user) {
        const accessToken = this.jwtService.sign({
            email: user.email,
            permissions: [user.permissions],
            sub: user._id
        });
        return this.sendTemplateEmail(this.configService.get("NO_REPLY_EMAIL_SENDER"), user.email, this.configService.get("EMAIL_TEMPLATE_RESET_PASSWORD"), {
            userEmail: `${user.firstName} ${user.lastName}`,
            resetPwdLink: `${this.configService.get("PUBLIC_FRONTEND_URL")}/mail/link-receive?resetTokenPwd=${accessToken}`
        });
    }
    async sendTemplateEmail(sender, receiver, template, templateVar) {
        return this.emailService.sendEmail(new emails_1.Email()
            .from(sender)
            .to(receiver)
            .templateVar(templateVar)
            .template(template));
    }
};
UserEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [emails_1.EmailService, config_1.ConfigService, jwt_1.JwtService])
], UserEmailService);
exports.UserEmailService = UserEmailService;
//# sourceMappingURL=user-email.service.js.map
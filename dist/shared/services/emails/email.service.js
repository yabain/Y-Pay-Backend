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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const nest_aws_sdk_1 = require("nest-aws-sdk");
let EmailService = class EmailService {
    constructor(awsEmailService) {
        this.awsEmailService = awsEmailService;
    }
    sendEmail(emailObj) {
        let email = emailObj.toJSON();
        let params = {
            Source: email.from.toString(),
            Destination: {
                ToAddresses: email.to,
            },
            Message: {
                Subject: { Data: email.subject },
                Body: { Text: { Data: email.content } }
            },
            Template: "",
            TemplateData: ""
        };
        if (!email.template) {
            delete params.Template;
            delete params.TemplateData;
            return this.awsEmailService.sendEmail(params).promise();
        }
        params.Template = email.template;
        params.TemplateData = JSON.stringify(email.templateVar);
        delete params.Message;
        return this.awsEmailService.sendTemplatedEmail(params).promise();
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_aws_sdk_1.InjectAwsService)(aws_sdk_1.SES)),
    __metadata("design:paramtypes", [aws_sdk_1.SES])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map
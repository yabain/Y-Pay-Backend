"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const aws_sdk_1 = require("aws-sdk");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const configuration_1 = require("./config/configuration");
const security_module_1 = require("./security/security.module");
const emails_1 = require("./services/emails");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: configService.get("mongoURI")
                })
            }),
            security_module_1.SecurityModule,
            nest_aws_sdk_1.AwsSdkModule.forRootAsync({
                defaultServiceOptions: {
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: async (configService) => ({
                        region: configService.get("AWS_SDK_REGION"),
                        credentials: {
                            accessKeyId: configService.get("AWS_SDK_ACCESS_KEY"),
                            secretAccessKey: configService.get("AWS_SDK_SECRET_KEY")
                        }
                    })
                },
                services: [
                    aws_sdk_1.SES,
                    aws_sdk_1.S3
                ]
            }),
        ],
        providers: [
            emails_1.EmailService,
        ],
        exports: [
            security_module_1.SecurityModule,
            config_1.ConfigModule,
            mongoose_1.MongooseModule,
            nest_aws_sdk_1.AwsSdkModule,
            emails_1.EmailService
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map
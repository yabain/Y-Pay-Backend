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
exports.FileS3UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const nest_aws_sdk_1 = require("nest-aws-sdk");
let FileS3UploadService = class FileS3UploadService {
    constructor(s3Service, configService) {
        this.s3Service = s3Service;
        this.configService = configService;
    }
    async updloadFileToS3(files) {
        return new Promise((resolve, reject) => {
            Promise.all(files.map((file) => this.s3Service.upload({
                Bucket: this.configService.get('AWS_SDK_UPLOAD_FILE_BUCKET_NAME'),
                Body: file.buffer,
                Key: `${file.originalname}`
            }).promise()))
                .then((result) => {
                resolve(result.map((r) => ({
                    url: r.Location,
                    key: r.Key,
                    name: r.Key.split("-")[1],
                    bucket: r.Bucket
                })));
            })
                .catch((error) => {
                reject(new common_1.InternalServerErrorException());
            });
        });
    }
};
FileS3UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_aws_sdk_1.InjectAwsService)(aws_sdk_1.S3)),
    __metadata("design:paramtypes", [aws_sdk_1.S3,
        config_1.ConfigService])
], FileS3UploadService);
exports.FileS3UploadService = FileS3UploadService;
//# sourceMappingURL=file-s3-uplodad.service.js.map
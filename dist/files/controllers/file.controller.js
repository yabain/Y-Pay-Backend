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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const pipes_1 = require("../../shared/pipes");
const guards_1 = require("../../user/guards");
const services_1 = require("../services");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadFiles(files, ticketID) {
        try {
            let filesUploaded = await this.fileService.uploadFile(files, ticketID);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: "File(s) uploaded successfully",
                data: filesUploaded
            };
        }
        catch (error) {
            throw error;
        }
    }
    async downLoadFile() {
    }
};
__decorate([
    (0, common_1.Post)("upload/:ticketID"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, {
        fileFilter: (req, file, callback) => {
            let ext = path.extname(file.originalname);
            if (!['.pdf', '.doc', '.docx'].includes(ext.toLowerCase())) {
                return callback(new common_1.UnprocessableEntityException({
                    statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    error: "Unprocessable entity",
                    message: ['Invalid file type']
                }), false);
            }
            return callback(null, true);
        }
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)("ticketID", pipes_1.ObjectIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Get)("dowload/:name"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileController.prototype, "downLoadFile", null);
FileController = __decorate([
    (0, common_1.Controller)("files"),
    (0, common_1.UseGuards)(guards_1.UserJwtAuthGuard),
    __metadata("design:paramtypes", [services_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map
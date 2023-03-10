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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const services_1 = require("../../ticket/services");
const models_1 = require("../models");
const file_s3_uplodad_service_1 = require("./file-s3-uplodad.service");
let FileService = class FileService {
    constructor(model, uploadS3Service, connection, ticketService) {
        this.model = model;
        this.uploadS3Service = uploadS3Service;
        this.connection = connection;
        this.ticketService = ticketService;
    }
    async create(createFileDTO, transaction = null) {
        return new this.model(createFileDTO).save({ session: transaction });
    }
    async uploadFile(files, ticketID = null) {
        const transaction = await this.connection.startSession();
        transaction.startTransaction();
        let filesResult = null;
        try {
            let resultFiles = await this.uploadS3Service.updloadFileToS3(files);
            filesResult = await Promise.all(resultFiles.map((file) => this.create(file, transaction)));
            if (ticketID)
                await Promise.all(filesResult.map((file) => this.ticketService.addFile({ "_id": new mongoose_2.default.Types.ObjectId(ticketID) }, file, transaction)));
            await transaction.commitTransaction();
        }
        catch (error) {
            await transaction.abortTransaction();
            throw error;
        }
        finally {
            transaction.endSession();
        }
        return filesResult;
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.File.name)),
    __param(2, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_s3_uplodad_service_1.FileS3UploadService, mongoose_2.default.Connection, services_1.TicketService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map
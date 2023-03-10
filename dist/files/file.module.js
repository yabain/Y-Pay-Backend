"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shared_module_1 = require("../shared/shared.module");
const ticket_module_1 = require("../ticket/ticket.module");
const controllers_1 = require("./controllers");
const models_1 = require("./models");
const services_1 = require("./services");
let FileModule = class FileModule {
};
FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            mongoose_1.MongooseModule.forFeature([{ name: models_1.File.name, schema: models_1.FileSchema }]),
            ticket_module_1.TicketModule
        ],
        controllers: [controllers_1.FileController],
        providers: [services_1.FileS3UploadService, services_1.FileService],
        exports: [services_1.FileS3UploadService, services_1.FileService],
    })
], FileModule);
exports.FileModule = FileModule;
//# sourceMappingURL=file.module.js.map
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
exports.CreateAppDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAppDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Application name",
        type: String
    }),
    (0, class_validator_1.MinLength)(5, {
        message: 'Application name is too short',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], CreateAppDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Url called once the status of a payment change",
        type: String
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        message: "UrlToCallBack must be a valid url endpoint"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppDTO.prototype, "urlToCallBack", void 0);
exports.CreateAppDTO = CreateAppDTO;
//# sourceMappingURL=create-app.dto.js.map
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
exports.UpdateUserDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_user_dto_1 = require("./create-user.dto");
const user_setting_dto_1 = require("./user-setting.dto");
class UpdateUserDTO extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDTO) {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "coverPicture", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMobilePhone)("any"),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "whatsappContact", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "skype", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsFQDN)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "websiteLink", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => user_setting_dto_1.UserSettingDTO),
    __metadata("design:type", user_setting_dto_1.UserSettingDTO)
], UpdateUserDTO.prototype, "userSetting", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
//# sourceMappingURL=update-user.dto.js.map
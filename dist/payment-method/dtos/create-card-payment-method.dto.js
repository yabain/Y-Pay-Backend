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
exports.CreateCardPaymentMethodDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
class CreateCardPaymentMethodDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Credit Card Number",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsCreditCard)(),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Card expiry date",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(5),
    (0, class_validator_1.Validate)(validators_1.ValidFormatExpirationDateCardValidator),
    (0, class_validator_1.Validate)(validators_1.ExpiredCardValidator),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "expirationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Credit Card owner",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "ownerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Billing address full name",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "fulnameFacturation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Company of the billing address",
        type: String
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "companyFacturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Country of the billing address",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "countryFacturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Locality of the billing address",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "addressFacturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "billing address city",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "cityFacturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "billing address region",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(65),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "regionFacturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "postal code of billing address",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPostalCode)(),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "postalCodeFacturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Billing address phone number",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "phoneNumberFacturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Billing Address Email",
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCardPaymentMethodDTO.prototype, "emailFacturation", void 0);
exports.CreateCardPaymentMethodDTO = CreateCardPaymentMethodDTO;
//# sourceMappingURL=create-card-payment-method.dto.js.map
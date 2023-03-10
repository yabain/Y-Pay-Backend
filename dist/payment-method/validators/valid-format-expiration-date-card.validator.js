"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidFormatExpirationDateCardValidator = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidFormatExpirationDateCardValidator = class ValidFormatExpirationDateCardValidator {
    validate(value, validationArguments) {
        return /^[0-9]{2}[./-][0-9]{2}$/.test(value);
    }
    defaultMessage(validationArguments) {
        return "The format of your card's expiration date is invalid";
    }
};
ValidFormatExpirationDateCardValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsValidFormatExpirationDateCard", async: true }),
    (0, common_1.Injectable)()
], ValidFormatExpirationDateCardValidator);
exports.ValidFormatExpirationDateCardValidator = ValidFormatExpirationDateCardValidator;
//# sourceMappingURL=valid-format-expiration-date-card.validator.js.map
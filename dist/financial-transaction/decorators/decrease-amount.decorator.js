"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidAmount = void 0;
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
function IsValidAmount(validationOption) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsValidAmount',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOption,
            validator: validators_1.DecreaseAmountValidator
        });
    };
}
exports.IsValidAmount = IsValidAmount;
//# sourceMappingURL=decrease-amount.decorator.js.map
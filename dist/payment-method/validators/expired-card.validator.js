"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredCardValidator = void 0;
class ExpiredCardValidator {
    validate(value, validationArguments) {
        let found = value.match(/^([0-1][0-9])[./-]([0-9]{2})$/);
        if (!found)
            return false;
        try {
            return new Date() <= new Date(parseInt(found[1]) - 1, parseInt(found[2]));
        }
        catch (error) {
            return false;
        }
    }
    defaultMessage(validationArguments) {
        return "Card expired";
    }
}
exports.ExpiredCardValidator = ExpiredCardValidator;
//# sourceMappingURL=expired-card.validator.js.map
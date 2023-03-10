"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardPaymentMethodDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_card_payment_method_dto_1 = require("./create-card-payment-method.dto");
class UpdateCardPaymentMethodDTO extends (0, mapped_types_1.PartialType)(create_card_payment_method_dto_1.CreateCardPaymentMethodDTO) {
}
exports.UpdateCardPaymentMethodDTO = UpdateCardPaymentMethodDTO;
//# sourceMappingURL=update-card-payment-method.dto.js.map
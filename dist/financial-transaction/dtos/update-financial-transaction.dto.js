"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFinancialTransactionDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_financial_transaction_dto_1 = require("./create-financial-transaction.dto");
class UpdateFinancialTransactionDTO extends (0, mapped_types_1.PartialType)(create_financial_transaction_dto_1.CreateFinancialTransactionDTO) {
}
exports.UpdateFinancialTransactionDTO = UpdateFinancialTransactionDTO;
//# sourceMappingURL=update-financial-transaction.dto.js.map
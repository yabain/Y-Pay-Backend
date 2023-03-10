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
exports.CardMethodPaymentSchema = exports.CardMethodPayment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../user/models");
let CardMethodPayment = class CardMethodPayment {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "ownerName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: models_1.User.name }),
    __metadata("design:type", models_1.User)
], CardMethodPayment.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now(), required: true }),
    __metadata("design:type", Date)
], CardMethodPayment.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "fulnameFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "companyFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "countryFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "addressFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "cityFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "regionFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "postalCodeFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "phoneNumberFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardMethodPayment.prototype, "emailFacturation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], CardMethodPayment.prototype, "isDeleted", void 0);
CardMethodPayment = __decorate([
    (0, mongoose_1.Schema)({
        toObject: {
            transform(doc, ret, options) {
                ret.owner = ret.owner._id;
                delete ret.__v;
                delete ret.isDeleted;
            },
        },
        toJSON: {
            transform(doc, ret, options) {
                ret.owner = ret.owner._id;
                delete ret.__v;
                delete ret.isDeleted;
            },
        }
    })
], CardMethodPayment);
exports.CardMethodPayment = CardMethodPayment;
exports.CardMethodPaymentSchema = mongoose_1.SchemaFactory.createForClass(CardMethodPayment);
//# sourceMappingURL=card-method-payment.schema.js.map
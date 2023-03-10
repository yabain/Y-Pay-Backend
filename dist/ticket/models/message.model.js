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
exports.MessageSchema = exports.Message = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../user/models");
const ticket_model_1 = require("./ticket.model");
let Message = class Message extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: models_1.User.name, default: null }),
    __metadata("design:type", models_1.User)
], Message.prototype, "from", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: models_1.User.name, default: null }),
    __metadata("design:type", models_1.User)
], Message.prototype, "to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: ticket_model_1.Ticket.name, default: null }),
    __metadata("design:type", ticket_model_1.Ticket)
], Message.prototype, "ticket", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "isRead", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now(), required: true }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
Message = __decorate([
    (0, mongoose_1.Schema)({
        toObject: {
            transform: function (doc, ret) {
                if (ret.from)
                    ret.from = ret.from._id;
                if (ret.to)
                    ret.to = ret.to._id;
                ret.ticket = ret.ticket._id;
                delete ret.isDeleted;
                delete ret.__v;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                if (ret.from)
                    ret.from = ret.from._id;
                if (ret.to)
                    ret.to = ret.to._id;
                ret.ticket = ret.ticket._id;
                delete ret.isDeleted;
                delete ret.__v;
            }
        }
    })
], Message);
exports.Message = Message;
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(Message);
//# sourceMappingURL=message.model.js.map
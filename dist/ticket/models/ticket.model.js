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
exports.TicketSchema = exports.Ticket = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../application/models");
const models_2 = require("../../files/models");
const models_3 = require("../../user/models");
const enums_1 = require("../enums");
let Ticket = class Ticket extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, unique: true, default: Math.floor(Math.random() * 10000000) }),
    __metadata("design:type", Number)
], Ticket.prototype, "refNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: models_1.Application.name }),
    __metadata("design:type", models_1.Application)
], Ticket.prototype, "app", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: models_3.User.name, required: true }),
    __metadata("design:type", models_3.User)
], Ticket.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: enums_1.TicketState, default: enums_1.TicketState.CLOSED }),
    __metadata("design:type", String)
], Ticket.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Types.ObjectId], ref: models_2.File.name, default: [] }),
    __metadata("design:type", Array)
], Ticket.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: models_3.User.name }),
    __metadata("design:type", models_3.User)
], Ticket.prototype, "closedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now() }),
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
Ticket = __decorate([
    (0, mongoose_1.Schema)({
        toObject: {
            transform: function (doc, ret) {
                ret.owner = ret.owner._id;
                ret.app = ret.app._id;
                if (ret.closedBy)
                    ret.closedBy = ret.closedBy._id;
                delete ret.__v;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.owner = ret.owner._id;
                ret.app = ret.app._id;
                if (ret.closedBy)
                    ret.closedBy = ret.closedBy._id;
                delete ret.__v;
            }
        }
    })
], Ticket);
exports.Ticket = Ticket;
exports.TicketSchema = mongoose_1.SchemaFactory.createForClass(Ticket);
//# sourceMappingURL=ticket.model.js.map
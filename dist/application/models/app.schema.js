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
exports.ApplicationSchema = exports.Application = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const rand_token_1 = require("rand-token");
const uuid_1 = require("uuid");
const mongoose_2 = require("mongoose");
const models_1 = require("../../user/models");
const enum_1 = require("../enum");
const models_2 = require("../../files/models");
let Application = class Application {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Application.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], Application.prototype, "urlToCallBack", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: models_1.User.name, required: true }),
    __metadata("design:type", models_1.User)
], Application.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: (0, uuid_1.v4)(), required: true }),
    __metadata("design:type", String)
], Application.prototype, "clientIdSandbox", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: (0, rand_token_1.uid)(256), required: true }),
    __metadata("design:type", String)
], Application.prototype, "privateKeySandbox", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: (0, uuid_1.v4)(), required: true }),
    __metadata("design:type", String)
], Application.prototype, "clientIdProd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: (0, rand_token_1.uid)(256), required: true }),
    __metadata("design:type", String)
], Application.prototype, "privateKeyProd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now(), required: true }),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Application.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Types.ObjectId], ref: models_2.File.name, default: [] }),
    __metadata("design:type", Array)
], Application.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: enum_1.CanUseInProdState, default: enum_1.CanUseInProdState.SANDBOX }),
    __metadata("design:type", String)
], Application.prototype, "canUseInProdModeState", void 0);
Application = __decorate([
    (0, mongoose_1.Schema)({
        toObject: {
            transform: function (doc, ret) {
                ret.owner = ret.owner._id;
                delete ret.__v;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.owner = ret.owner._id;
                delete ret.__v;
            }
        }
    })
], Application);
exports.Application = Application;
exports.ApplicationSchema = mongoose_1.SchemaFactory.createForClass(Application);
//# sourceMappingURL=app.schema.js.map
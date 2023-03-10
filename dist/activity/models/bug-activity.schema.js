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
exports.BugActivitySchema = exports.BugActivity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../user/models");
let BugActivity = class BugActivity extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now(), type: Date }),
    __metadata("design:type", Date)
], BugActivity.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: models_1.User.name }),
    __metadata("design:type", models_1.User)
], BugActivity.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], BugActivity.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], BugActivity.prototype, "request", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], BugActivity.prototype, "response", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], BugActivity.prototype, "hasError", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], BugActivity.prototype, "otherProps", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], BugActivity.prototype, "error", void 0);
BugActivity = __decorate([
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
], BugActivity);
exports.BugActivity = BugActivity;
exports.BugActivitySchema = mongoose_1.SchemaFactory.createForClass(BugActivity);
//# sourceMappingURL=bug-activity.schema.js.map
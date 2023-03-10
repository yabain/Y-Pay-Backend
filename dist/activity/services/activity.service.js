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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../models");
let ActivityService = class ActivityService {
    constructor(activityModel, connection) {
        this.activityModel = activityModel;
        this.connection = connection;
    }
    async create(activity) {
        return await new this.activityModel(activity).save();
    }
    getInstance(activity) {
        return new this.activityModel(activity);
    }
    async getActivityByPagination(userId, page, limit) {
        return this.activityModel.find({ "_id": userId }).sort({ createdAt: 1 }).limit(limit).skip(page * limit).exec();
    }
};
ActivityService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(models_1.Activity.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.default.Connection])
], ActivityService);
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map
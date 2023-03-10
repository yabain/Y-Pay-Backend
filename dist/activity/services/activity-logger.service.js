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
exports.ActivityLoggerService = void 0;
const common_1 = require("@nestjs/common");
const activity_service_1 = require("./activity.service");
let ActivityLoggerService = class ActivityLoggerService extends common_1.ConsoleLogger {
    constructor(activityService) {
        super();
        this.activityService = activityService;
    }
    async logActivity(activity) {
        return this.activityService.create(activity);
    }
    getLogActivityInstance(activity) {
        return this.activityService.getInstance(activity);
    }
};
ActivityLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityLoggerService);
exports.ActivityLoggerService = ActivityLoggerService;
//# sourceMappingURL=activity-logger.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const app_module_1 = require("./app.module");
const exceptions_1 = require("./shared/exceptions");
const swagger_1 = require("./shared/docs/swagger");
const filters_1 = require("./shared/filters");
const services_1 = require("./activity/services");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true
    });
    app.useLogger(app.get(services_1.ActivityLoggerService));
    const port = process.env.PORT || 3000;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    app.enableCors();
    app.useGlobalFilters(new exceptions_1.MongoExceptionFilter());
    app.useGlobalFilters(new filters_1.AllHttpExceptionsFilter());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    (0, swagger_1.AddSwaggerDoc)(app);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
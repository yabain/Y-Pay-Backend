"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSwaggerDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
function AddSwaggerDoc(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Y-Nkap API Documentation')
        .setDescription('Y-Nkap API Description')
        .setVersion('1.0')
        .addServer("http://localhost:3000", "Local environment")
        .addServer("http://api-dev.y-nkap.com", "Sandbox environment")
        .addServer("http://api.y-nkap.com", "Production environment")
        .addBasicAuth()
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
}
exports.AddSwaggerDoc = AddSwaggerDoc;
//# sourceMappingURL=add-swagger-doc.swagger.js.map
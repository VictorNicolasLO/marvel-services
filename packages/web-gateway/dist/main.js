"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const core_1 = require("@nestjs/core");
const web_gateway_module_1 = require("./web-gateway.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(web_gateway_module_1.WebGatewayModule);
    app.setGlobalPrefix("marvel");
    app.listen(3200);
}
bootstrap();
//# sourceMappingURL=main.js.map
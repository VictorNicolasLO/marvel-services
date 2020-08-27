"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const core_1 = require("@nestjs/core");
const comics_module_1 = require("./comics.module");
const infrastructure_1 = require("@marvel/infrastructure");
infrastructure_1.MongoDriver.init(process.env.MONGO_URL);
async function bootstrap() {
    const app = await core_1.NestFactory.create(comics_module_1.ComicsModule);
    app.init();
}
bootstrap();
//# sourceMappingURL=main.js.map
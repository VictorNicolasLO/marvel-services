"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@nestjs/core");
const marvel_comics_cron_module_1 = require("./marvel-comics-cron.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(marvel_comics_cron_module_1.MarvelComicsCronModule);
    app.init();
}
bootstrap();
//# sourceMappingURL=main.js.map
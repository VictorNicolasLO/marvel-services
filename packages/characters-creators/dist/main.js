"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const core_1 = require("@nestjs/core");
const character_creators_module_1 = require("./character-creators.module");
const infrastructure_1 = require("@marvel/infrastructure");
infrastructure_1.MongoDriver.init(process.env.MONGO_URL);
async function bootstrap() {
    const app = await core_1.NestFactory.create(character_creators_module_1.CharacterCreatorsModule);
    app.init();
}
bootstrap();
//# sourceMappingURL=main.js.map
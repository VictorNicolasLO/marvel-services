"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const core_1 = require("@nestjs/core");
const character_interaction_module_1 = require("./character-interaction.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(character_interaction_module_1.CharacterInteractionModule);
    app.init();
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const core_1 = require("@nestjs/core");
const search_character_interaction_module_1 = require("./search-character-interaction.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(search_character_interaction_module_1.SearchCharacterInteractionModule);
    app.init();
}
bootstrap();
//# sourceMappingURL=main.js.map
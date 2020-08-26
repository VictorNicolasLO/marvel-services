require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { SearchCharacterInteractionModule } from "./search-character-interaction.module";

async function bootstrap() {
  const app = await NestFactory.create(SearchCharacterInteractionModule);
  app.init();
}
bootstrap();

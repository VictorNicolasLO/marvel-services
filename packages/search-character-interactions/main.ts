require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { CharacterInteractionModule } from "./character-interaction.module";

async function bootstrap() {
  const app = await NestFactory.create(CharacterInteractionModule);
  app.init();
}
bootstrap();

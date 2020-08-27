require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { CharacterInteractionModule } from "./character-interaction.module";
import { MongoDriver } from "@marvel/infrastructure";

MongoDriver.init(process.env.MONGO_URL);

async function bootstrap() {
  const app = await NestFactory.create(CharacterInteractionModule);
  app.init();
}
bootstrap();

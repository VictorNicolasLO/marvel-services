require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { CharacterCreatorsModule } from "./character-creators.module";
import { MongoDriver } from "@marvel/infrastructure";

MongoDriver.init(process.env.MONGO_URL);

async function bootstrap() {
  const app = await NestFactory.create(CharacterCreatorsModule);
  app.init();
}
bootstrap();

require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { ComicsModule } from "./comics.module";
import { MongoDriver } from "@marvel/infrastructure";

MongoDriver.init(process.env.MONGO_URL);

async function bootstrap() {
  const app = await NestFactory.create(ComicsModule);
  app.init();
}
bootstrap();

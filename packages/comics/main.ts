require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { ComicsModule } from "./comics.module";

async function bootstrap() {
  const app = await NestFactory.create(ComicsModule);
  app.init();
}
bootstrap();

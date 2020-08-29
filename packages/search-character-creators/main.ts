require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { SearchCharacterCreatorModule } from "./search-character-creators.module";

async function bootstrap() {
  const app = await NestFactory.create(SearchCharacterCreatorModule);
  app.init();
}
bootstrap();

require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { SearchCharacterCreatorsModule } from "./search-character-creators.module";

async function bootstrap() {
  const app = await NestFactory.create(SearchCharacterCreatorsModule);
  app.init();
}
bootstrap();

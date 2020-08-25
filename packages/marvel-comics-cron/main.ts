require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { MarvelComicsCronModule } from './marvel-comics-cron.module';

async function bootstrap() {
  const app = await NestFactory.create(MarvelComicsCronModule);
  app.init()
}
bootstrap();

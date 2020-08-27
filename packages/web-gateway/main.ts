require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { WebGatewayModule } from "./web-gateway.module";

async function bootstrap() {
  const app = await NestFactory.create(WebGatewayModule);
  app.setGlobalPrefix("marvel");
  app.listen(3200);
}
bootstrap();

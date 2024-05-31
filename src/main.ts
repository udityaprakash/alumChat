import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on port:${port}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
// import { ConfigService } from '@nestjs/config/dist/config.service';
// import { JwtService } from '@nestjs/jwt/dist/jwt.service';
// import { ResponseInterceptor } from './modules/common/Interceptors/response.interceptor';
// import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const port = process.env.PORT || 3000;
  // const configService = app.get(ConfigService);
  // const jwtService = app.get(JwtService);
  // app.useGlobalInterceptors(new ResponseInterceptor(jwtService, configService));
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on port:${port}`);
}
bootstrap();

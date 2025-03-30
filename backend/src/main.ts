import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true
  })

  app.use(cookieParser());

  const globalPrefix = '/api/v1';

  app.setGlobalPrefix(globalPrefix);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();

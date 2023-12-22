/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { HttpConfig } from './common/types/http.types';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware';
import SwaggerInit from './swagger';
import { ResponseHeaderMiddlewareBuilder } from './common/middleware/response-header.middleware';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );
  const responseHeadersMiddleware =
    new ResponseHeaderMiddlewareBuilder()
      .add('Cache-Control', 'no-cache')
      .add('X-Frame-Options', 'DENY')
      .add('X-Content-Type-Options', 'nosniff')
      .add('X-XSS-Protection', '1; mode=block')
      .add(
        'Strict-Transport-Security',
        'max-age=15552000; includeSubDomains',
      )
      .add('Allow', 'GET, POST, OPTIONS')
      .remove('Server')
      .remove('X-Powered-By')
      .build();

  app.use(responseHeadersMiddleware);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  });

  SwaggerInit(app);

  // Server
  const configService = app.get(ConfigService);
  const httpConfig =
    configService.get<HttpConfig>('http');

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // app.use(new LoggerMiddleware());

  await app.listen(httpConfig.port);
  console.log(
    `FreshPress RestApi is running on: http://${httpConfig.host}:${httpConfig.port}`,
  );
}
bootstrap();

// https://medium.com/simform-engineering/nestjs-and-postgresql-a-crud-tutorial-32aa78778752
// https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
// https://blog.stackademic.com/establishing-postgresql-connection-with-typeorm-in-nestjs-df1593bfc6a1

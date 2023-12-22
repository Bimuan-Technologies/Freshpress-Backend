/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { HttpConfig } from './common/types/http.types';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware';
import SwaggerInit from './swagger';
import { ResponseHeaderMiddlewareBuilder } from './common/middleware/response-header.middleware';
import * as express from 'express';
import { Logger } from '@nestjs/common';
import { createLogger } from 'winston';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import path from 'path';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  // Create winston logger
  const instance = createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      nestWinstonModuleUtilities.format.nestLike(
        'AppMonitor',
        {
          prettyPrint: true,
        },
      ),
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          nestWinstonModuleUtilities.format.nestLike(
            'AppMonitor',
            {
              colors: true,
              prettyPrint: true,
            },
          ),
        ),
      }),
      new winston.transports.File({
        filename: path.join(
          __dirname,
          '..',
          'logs',
          'error.log',
        ),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.join(
          __dirname,
          '..',
          'logs',
          'debug.log',
        ),
      }),
    ],
  });

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
  app.use(
    express.urlencoded({
      extended: true,
      limit: '50mb',
    }),
  );
  app.use(express.json({ limit: '50mb' }));

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

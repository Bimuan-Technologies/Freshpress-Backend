/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { HttpConfig } from './type/http.types';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Freshpress Web API')
    .setDescription(
      'Official Documentation of FreshPress Platform/WebService API',
    )
    .setVersion('1.0')
    .addTag('Freshpress RESTful API endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc/api', app, document);

  // Server
  const configService = app.get(ConfigService);
  const httpConfig = configService.get<HttpConfig>('http');

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(httpConfig.port);
  console.log(
    `FreshPress Web Service is running on: http://${httpConfig.host}:${httpConfig.port}`,
  );
}
bootstrap();

// https://medium.com/simform-engineering/nestjs-and-postgresql-a-crud-tutorial-32aa78778752
// https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
// https://blog.stackademic.com/establishing-postgresql-connection-with-typeorm-in-nestjs-df1593bfc6a1

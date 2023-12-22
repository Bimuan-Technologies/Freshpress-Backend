/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export default function SwaggerInit(
  app: INestApplication,
) {
  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Freshpress RESTFul API')
    .setDescription(
      'FreshPress API Official Documentation',
    )
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Freshpress RESTFul API',
    useGlobalPrefix: false,
  };

  // const config = new DocumentBuilder()
  //   .setTitle('Freshpress Web API')
  //   .setDescription(
  //     'Official Documentation of FreshPress Platform/WebService API',
  //   )
  //   .setVersion('1.0')
  //   .addTag('Freshpress RESTful API endpoints')
  //   .build();
}

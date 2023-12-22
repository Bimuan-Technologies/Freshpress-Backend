/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

export default function SwaggerInit(
  app: INestApplication,
) {
  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Freshpress Web API')
    .setDescription(
      'Official Documentation of FreshPress Platform/WebService API',
    );

  // const config = new DocumentBuilder()
  //   .setTitle('Freshpress Web API')
  //   .setDescription(
  //     'Official Documentation of FreshPress Platform/WebService API',
  //   )
  //   .setVersion('1.0')
  //   .addTag('Freshpress RESTful API endpoints')
  //   .build();
}

/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  const document = SwaggerModule.createDocument(
    app,
    documentConfig,
    {
      include: [AppModule, PersonModule],
    },
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

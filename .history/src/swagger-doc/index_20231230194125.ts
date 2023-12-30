/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { IdentityAuthModule } from 'src/identity-auth/identity-auth.module';
import { PersonModule } from 'src/user/person.module';

export default function SwaggerInit(
  app: INestApplication,
) {
  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(
      'Freshpress Laundry Pick up and Drop off Service',
    )
    .setDescription(
      'FreshPress API Official Documentation',
    )
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
    },
    customSiteTitle:
      'Freshpress API Documentation',
    useGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(
    app,
    documentConfig,
    {
      operationIdFactory: (
        _controlerKey,
        methodKey,
      ) => methodKey,
      include: [
        AppModule,
        PersonModule,
        IdentityAuthModule,
      ],
    },
  );

  // if (process.env.NODE_ENV === 'development') {
  //   app.use(
  //     '/freshpress/api/doc',
  //     basicAuth({
  //       challenge: true,
  //       users: {
  //         ['mqrksimon@gmail.com']: '12345678',
  //       },
  //     }),
  //   );

  //   SwaggerModule.setup(
  //     '/freshpress/api/doc',
  //     app,
  //     document,
  //     customOptions,
  //   );
  //   return;
  // }

  SwaggerModule.setup(
    '/freshpress/api/doc',
    app,
    document,
    customOptions,
  );
}

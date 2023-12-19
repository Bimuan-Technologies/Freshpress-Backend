import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// https://medium.com/simform-engineering/nestjs-and-postgresql-a-crud-tutorial-32aa78778752
// https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
// https://blog.stackademic.com/establishing-postgresql-connection-with-typeorm-in-nestjs-df1593bfc6a1

import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { PersonModule } from './user/person.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
// import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './middleware';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    PersonModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}

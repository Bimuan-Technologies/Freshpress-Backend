import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { PersonModule } from './user/person.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
// import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { IdentityAuthModule } from './identity-auth/identity-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    PersonModule,
    PrismaModule,
    IdentityAuthModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes('/');
//   }
// }

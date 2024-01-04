import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { PersonModule } from './user/person.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
// import { DatabaseModule } from './database/database.module';
// import { LoggerMiddleware } from './common/middleware';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { IdentityAuthModule } from './identity-auth/identity-auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ProfileService } from './api/profile/profile.service';
import { ProfileModule } from './api/profile/profile.module';
import { RatingReviewController } from './api/rating_review/rating_review.controller';
import { RatingReviewService } from './api/rating_review/rating_review.service';
import { RatingReviewModule } from './api/rating_review/rating_review.module';
import { CustomTwillioModule } from './api/twillio/twillio.module';
import { MailModule } from './api/mail/mail.module';

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
    ProfileModule,
    RatingReviewModule,
    CustomTwillioModule,
    MailModule,
  ],
  controllers: [RatingReviewController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    PrismaService,
    ProfileService,
    RatingReviewService,
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes('/');
//   }
// }

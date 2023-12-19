import { Module } from '@nestjs/common';
import { PersonModule } from './user/person.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    PersonModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

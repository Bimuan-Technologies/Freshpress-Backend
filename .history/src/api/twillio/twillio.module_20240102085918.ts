import { Module } from '@nestjs/common';
import { TwillioService } from './twillio.service';
import { TwilioModule } from 'nestjs-twilio';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService,
      ) => ({
        accountSid: configService.get(
          'TWILIO_ACCOUNT_SID',
        ),
        authToken: configService.get<string>(''),
      }),
    }),
  ],
  providers: [TwillioService],
})
export class CustomTwillioModule {}

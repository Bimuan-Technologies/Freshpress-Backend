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
        accountSid: configService.get<string>(
          'sms.twillio_account_sid',
        ),
        authToken: configService.get<string>(
          'sms.twillio_auth_token',
        ),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TwillioService],
})
export class CustomTwillioModule {}

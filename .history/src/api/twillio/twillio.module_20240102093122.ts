import { Global, Module } from '@nestjs/common';
import { TwillioService } from './twillio.service';
import { TwilioModule } from 'nestjs-twilio';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

@Global()
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
  exports: [TwillioService],
})
export class CustomTwillioModule {}

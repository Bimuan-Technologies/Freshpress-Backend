import { Module } from '@nestjs/common';
import { TwillioService } from './twillio.service';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
    }),
  ],
  providers: [TwillioService],
})
export class CustomTwillioModule {}

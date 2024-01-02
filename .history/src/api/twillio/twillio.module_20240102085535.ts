import { Module } from '@nestjs/common';
import { TwillioService } from './twillio.service';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [],
  providers: [TwillioService],
})
export class CustomTwillioModule {}

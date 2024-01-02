import { Module } from '@nestjs/common';
import { TwillioService } from './twillio.service';

@Module({
  providers: [TwillioService]
})
export class TwillioModule {}

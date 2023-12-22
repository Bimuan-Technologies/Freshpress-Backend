import { Module } from '@nestjs/common';
import { IdentityAuthController } from './identity-auth.controller';
import { IdentityAuthService } from './identity-auth.service';
import {
  AtStrategy,
  RtStrategy,
} from './strategies';

@Module({
  controllers: [IdentityAuthController],
  providers: [
    IdentityAuthService,
    AtStrategy,
    RtStrategy,
  ],
})
export class IdentityAuthModule {}

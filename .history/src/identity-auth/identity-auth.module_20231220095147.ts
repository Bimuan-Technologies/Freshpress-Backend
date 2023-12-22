import { Module } from '@nestjs/common';
import { IdentityAuthController } from './identity-auth.controller';
import { IdentityAuthService } from './identity-auth.service';

@Module({
  controllers: [IdentityAuthController],
  providers: [IdentityAuthService]
})
export class IdentityAuthModule {}

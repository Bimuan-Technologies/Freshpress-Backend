import { Module } from '@nestjs/common';
import { IdentityAuthController } from './identity-auth.controller';
import { IdentityAuthService } from './identity-auth.service';
import {
  AtStrategy,
  RtStrategy,
} from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [IdentityAuthController],
  providers: [
    IdentityAuthService,
    AtStrategy,
    RtStrategy,
  ],
})
export class IdentityAuthModule {}

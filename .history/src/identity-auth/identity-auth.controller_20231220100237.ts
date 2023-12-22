import { Controller, Post } from '@nestjs/common';
import { IdentityAuthService } from './identity-auth.service';

@Controller('identity-auth')
export class IdentityAuthController {
  constructor(
    private readonly identityAuthService: IdentityAuthService,
  ) {}
  @Post('local/signup')
  signupLocal() {}

  @Post('local/signin')
  signinLocal() {}

  @Post('local/logout')
  logout() {}

  @Post('/refresh')
  refreshToken() {}
}

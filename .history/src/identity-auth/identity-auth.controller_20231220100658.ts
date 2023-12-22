import { Controller, Post } from '@nestjs/common';
import { IdentityAuthService } from './identity-auth.service';

@Controller('identity-auth')
export class IdentityAuthController {
  constructor(
    private readonly identityAuthService: IdentityAuthService,
  ) {}

  @Post('local/signup')
  signupLocal() {
    this.identityAuthService.signupLocal();
  }

  @Post('local/signin')
  signinLocal() {
    this.identityAuthService.signinLocal();
  }

  @Post('local/logout')
  logout() {
    this.identityAuthService.logout();
  }

  @Post('/refresh')
  refreshToken() {
    this.identityAuthService.refreshToken();
  }
}

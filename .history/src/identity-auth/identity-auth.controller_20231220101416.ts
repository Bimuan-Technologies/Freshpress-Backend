import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { IdentityAuthService } from './identity-auth.service';
import { AuthDto } from './dto';

@Controller('identity-auth')
export class IdentityAuthController {
  constructor(
    private readonly identityAuthService: IdentityAuthService,
  ) {}

  @Post('local/signup')
  signupLocal(@Body() dto: AuthDto) {
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

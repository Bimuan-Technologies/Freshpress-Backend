import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { IdentityAuthService } from './identity-auth.service';
import { AuthDto } from './dto';
import { Token } from 'src/common/types';

@Controller('identity-auth')
export class IdentityAuthController {
  constructor(
    private readonly identityAuthService: IdentityAuthService,
  ) {}

  @Post('local/signup')
  signupLocal(
    @Body() dto: AuthDto,
  ): Promise<Token> {
    this.identityAuthService.signupLocal(dto);
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

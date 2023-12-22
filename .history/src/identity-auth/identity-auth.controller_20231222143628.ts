import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.CREATED)
  signupLocal(
    @Body() dto: AuthDto,
  ): Promise<Token> {
    return this.identityAuthService.signupLocal(
      dto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/signin')
  signinLocal(
    @Body() dto: AuthDto,
  ): Promise<Token> {
    return this.identityAuthService.signinLocal(
      dto,
    );
  }

  @Post('local/logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    this.identityAuthService.logout();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken() {
    this.identityAuthService.refreshToken();
  }
}

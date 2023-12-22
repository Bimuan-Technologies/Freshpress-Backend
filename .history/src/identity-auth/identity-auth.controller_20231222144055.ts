import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IdentityAuthService } from './identity-auth.service';
import { AuthDto } from './dto';
import { Token } from 'src/common/types';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('local/logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    this.identityAuthService.logout();
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken() {
    this.identityAuthService.refreshToken();
  }
}

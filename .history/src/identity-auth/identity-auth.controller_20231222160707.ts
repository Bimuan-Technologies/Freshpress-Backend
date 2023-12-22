import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IdentityAuthService } from './identity-auth.service';
import { AuthDto } from './dto';
import { Token } from 'src/common/types';
import { Request } from 'express';
import {
  AtGuard,
  RtGuard,
} from 'src/common/guards';
import { GetCurrentPerson } from '../common/decorators'

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

  @UseGuards(AtGuard)
  @Post('local/logout')
  @HttpCode(HttpStatus.OK)
  logout(GetCurrentPerson() userId: number) {
    const person = req.user;
    this.identityAuthService.logout(
      person['sub'],
    );
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const person = req.user;
    return this.identityAuthService.refreshToken(
      person['sub'],
      person['refreshToken'],
    );
  }
}

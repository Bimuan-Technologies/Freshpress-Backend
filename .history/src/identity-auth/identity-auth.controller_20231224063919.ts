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

import {
  AtGuard,
  RtGuard,
} from 'src/common/guards';
import {
  GetCurrentPerson,
  GetCurrentPersonId,
  Public,
} from '../common/decorators';

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

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/signin')
  signinLocal(
    @Body() dto: AuthDto,
  ): Promise<Token> {
    return this.identityAuthService.signinLocal(
      dto,
    );
  }

  // @UseGuards(AtGuard)
  @Post('local/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentPersonId() userId: number) {
    return this.identityAuthService.logout(
      userId,
    );
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentPersonId() userId: number,
    @GetCurrentPerson('refreshToken')
    refreshToken: string,
  ) {
    // const person = req.user;
    return this.identityAuthService.refreshToken(
      userId,
      refreshToken,
    );
  }
}

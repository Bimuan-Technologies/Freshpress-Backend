import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IdentityAuthService } from './identity-auth.service';
import { AuthDto, VerifyPhoneOtp } from './dto';
import { Token } from 'src/common/types';

import {
  // AtGuard,
  RtGuard,
} from 'src/common/guards';
import {
  GetCurrentPerson,
  GetCurrentPersonId,
  Public,
} from '../common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication Endpoints')
@Controller('identity-auth')
export class IdentityAuthController {
  constructor(
    private readonly identityAuthService: IdentityAuthService,
  ) {}

  @Public()
  @Get('send-otp/:phone')
  @HttpCode(HttpStatus.OK)
  async verifyPhoneNumber(
    @Param('phone') phoneNumber: string,
  ): Promise<object> {
    return this.identityAuthService.sendOtpSmsService(
      phoneNumber,
    );
  }

  @Public()
  @Post('validate-otp')
  @HttpCode(HttpStatus.OK)
  async validateOtp(
    @Body() payload: VerifyPhoneOtp,
  ): Promise<string> {
    return this.identityAuthService.validateOtp(
      payload,
    );
  }

  @Public()
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

  @Public()
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

  @Get('send-email')
  sendEmailConfirmation() {
    return this.identityAuthService.testMailSending();
  }
}

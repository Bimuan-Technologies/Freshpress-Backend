import { Controller, Post } from '@nestjs/common';

@Controller('identity-auth')
export class IdentityAuthController {
  @Post('local/signup')
  signupLocal() {}

  @Post('local/signin')
  signinLocal() {}

  @Post('local/logout')
  logout() {}

  @Post('/refresh')
  refreshToken() {}
}

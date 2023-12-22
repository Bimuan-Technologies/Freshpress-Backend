import { Controller, Post } from '@nestjs/common';

@Controller('identity-auth')
export class IdentityAuthController {
  @Post('local/signup')
  signupLocal() {}
}

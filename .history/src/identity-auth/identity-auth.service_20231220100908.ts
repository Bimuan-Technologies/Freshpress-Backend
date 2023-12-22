import { PrismaService } from './../../.history/src/prisma/prisma.service_20231219141245';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityAuthService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  signupLocal() {}
  signinLocal() {}

  logout() {}

  refreshToken() {}
}

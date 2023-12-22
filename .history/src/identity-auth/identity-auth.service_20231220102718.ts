import { PrismaService } from './../../.history/src/prisma/prisma.service_20231219141245';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class IdentityAuthService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  signupLocal(dto: AuthDto) {
    const newPerson =
      this.prismaService.person.create({
        data: {
          email: dto.email,
        },
      });
  }
  signinLocal() {}

  logout() {}

  refreshToken() {}
}

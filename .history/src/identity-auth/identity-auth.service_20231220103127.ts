import { PrismaService } from './../../.history/src/prisma/prisma.service_20231219141245';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class IdentityAuthService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  async signupLocal(dto: AuthDto) {
    const hash = await this.hashData(
      dto.password,
    );
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

  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }
}

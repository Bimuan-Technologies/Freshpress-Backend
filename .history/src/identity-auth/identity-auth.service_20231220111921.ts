import { PrismaService } from './../../.history/src/prisma/prisma.service_20231219141245';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Token } from 'src/common/types';

@Injectable()
export class IdentityAuthService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  async signupLocal(
    dto: AuthDto,
  ): Promise<Token> {
    const hash = await this.hashData(
      dto.password,
    );
    const newPerson =
      await this.prismaService.person.create({
        data: {
          email: dto.email,
          hash,
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

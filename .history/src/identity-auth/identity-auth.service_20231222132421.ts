import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Token } from 'src/common/types';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdentityAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
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
    const tokens = await this.getTokens(
      newPerson.pk,
      newPerson.email,
    );
    await this.updateRtHash(
      newPerson.pk,
      tokens.refresh_token,
    );
    return tokens;
  }
  signinLocal() {}

  logout() {}

  refreshToken() {}

  async hashData(data: string) {
    return await bcrypt.hashSync(data, 10);
  }

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'uyey34ueby437347',
          expiresIn: 60 * 15, // 15 minutes
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'yufg7634gff3y',
          expiresIn: 60 * 60 * 24 * 7, // A week
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prismaService.person.update({
      where: {
        pk: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}

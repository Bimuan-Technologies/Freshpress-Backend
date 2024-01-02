import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto, VerifyPhoneOtp } from './dto';
import * as bcrypt from 'bcrypt';
import { Token } from 'src/common/types';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwillioService } from 'src/api/twillio/twillio.service';

@Injectable()
export class IdentityAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly twillioService: TwillioService,
  ) {}

  async sendOtpSmsService(
    to: string,
  ): Promise<object> {
    if (to.length < 0)
      throw new BadRequestException(
        'Invalid Phone Number',
      );
    try {
      await this.twillioService.sendOtpSms(to);
      return {
        success: true,
        message: 'OTP SMS sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send OTP SMS',
      };
    }
  }

  async validateOtp(
    payload: VerifyPhoneOtp,
  ): Promise<string> {
    const { phone, otp } = payload;
    if (!phone || !otp)
      throw new BadRequestException(
        'Phone Number or OTP is missing',
      );
    return 'Successfully';
  }

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

  async signinLocal(
    dto: AuthDto,
  ): Promise<Token> {
    const existingUser =
      await this.prismaService.person.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!existingUser) {
      throw new ForbiddenException(
        'Access Denied',
      );
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      existingUser.hash,
    );

    if (!passwordMatches) {
      throw new ForbiddenException(
        'Access Denied',
      );
    }

    const tokens = await this.getTokens(
      existingUser.pk,
      existingUser.email,
    );
    await this.updateRtHash(
      existingUser.pk,
      tokens.refresh_token,
    );
    return tokens;
  }

  async logout(personId: number) {
    await this.prismaService.person.updateMany({
      where: {
        pk: personId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshToken(userId: number, rt: string) {
    const person =
      await this.prismaService.person.findUnique({
        where: {
          pk: userId,
        },
      });
    if (!person || !person.hashedRt) {
      throw new ForbiddenException(
        'Access Denied Person not found',
      );
    }

    const rtMatches = await bcrypt.compare(
      rt,
      person.hashedRt,
    );

    if (!rtMatches)
      throw new ForbiddenException(
        'Access Denied RT didnt matched',
      );

    const tokens = await this.getTokens(
      person.pk,
      person.email,
    );
    await this.updateRtHash(
      person.pk,
      tokens.refresh_token,
    );
    return tokens;
  }

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

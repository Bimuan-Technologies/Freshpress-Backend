/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  ExtractJwt,
} from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'uyey34ueby437347',
    });
    {
    }
  }

  validate(payload: JwtPayload) {
    // req.user
    return payload;
  }
}

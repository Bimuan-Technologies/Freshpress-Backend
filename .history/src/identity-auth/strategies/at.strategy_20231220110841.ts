/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  ExtractJwt,
} from 'passport-jwt';

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

  validate(payload: any) {
    return payload;
  }
}

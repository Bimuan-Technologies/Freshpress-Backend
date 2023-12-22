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
      secretOrKey: '',
    });
    {
    }
  }

  validate(payload: any) {}
}

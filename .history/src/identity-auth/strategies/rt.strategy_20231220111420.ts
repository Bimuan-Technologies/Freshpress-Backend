/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  ExtractJwt,
} from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yufg7634gff3y',
      passReqToCallback: true,
    });
    {
    }
  }

  validate(req: Request, payload: any) {
    const refreshToken = req
      .get('authorization')
      .replace('Bearer', '')
      .trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}

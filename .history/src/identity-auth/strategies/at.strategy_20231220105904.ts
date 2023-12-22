/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ignoreElements } from 'rxjs';

export class AtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
    constructor(super({
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
            
    })){}
}

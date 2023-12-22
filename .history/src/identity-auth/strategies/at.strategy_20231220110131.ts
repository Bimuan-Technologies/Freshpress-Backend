/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ignoreElements } from 'rxjs';

export class AtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ''
            
        }) { }
    }
}

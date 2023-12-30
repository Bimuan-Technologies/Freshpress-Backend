/* eslint-disable prettier/prettier */
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic =
      this.reflector.getAllAndOverride(
        'isPublic',
        [context],
      );
    return super.canActivate(context);
  }
}

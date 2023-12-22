/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const GetCurrentPerson =
  createParamDecorator(
    (context: ExecutionContext) => {
      const request = context
        .switchToHttp()
        .getRequest();
      return request.user;
    },
  );

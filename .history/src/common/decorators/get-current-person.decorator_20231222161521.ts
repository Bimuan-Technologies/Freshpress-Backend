/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const GetCurrentPerson =
  createParamDecorator(
    (data: any, context: ExecutionContext) => {
      const request = context
        .switchToHttp()
        .getRequest();
      if (!data) return request.user;
      return request[data];
    },
  );

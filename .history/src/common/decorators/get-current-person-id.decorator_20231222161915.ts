/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const GetCurrentPersonId =
  createParamDecorator(
    (data: any, context: ExecutionContext) => {
      const request = context
        .switchToHttp()
        .getRequest();
      return request.user['sub'];
    },
  );

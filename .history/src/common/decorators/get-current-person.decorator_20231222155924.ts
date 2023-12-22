/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const GetCurrentPerson =
  createParamDecorator(
      (context: ExecutionContext) => {
          cosnt request = context.switchToHttp().getRequest()
    },
  );

import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const GetCurrentPerson =
  createParamDecorator(
    (context: ExecutionContext) => {},
  );

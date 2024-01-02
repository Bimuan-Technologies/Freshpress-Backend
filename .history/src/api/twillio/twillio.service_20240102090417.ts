import { Injectable } from '@nestjs/common';

@Injectable()
export class TwillioService {
  constructor(
    private readonly twillioService: TwillioService,
  ) {}
}

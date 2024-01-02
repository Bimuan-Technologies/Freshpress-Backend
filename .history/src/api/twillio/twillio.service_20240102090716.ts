import { Injectable } from '@nestjs/common';
import { TwillioService } from 'nestjs-twilio';

@Injectable()
export class CustomTwillioService {
  constructor(
    private readonly twillioService: TwillioService,
  ) {}

  async sendOtpSms(from: string, to: string) {
    return this.twillioService.cl;
  }
}

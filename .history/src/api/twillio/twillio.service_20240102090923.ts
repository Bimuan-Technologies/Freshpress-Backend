import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class TwillioService {
  constructor(
    private readonly twilioService: TwilioService,
  ) {}

  async sendOtpSms(from: string, to: string) {
    return this.twilioService.client.messages.create(
      {
        body: 'SMS body, sent to the phone!',
        from: from,
        to: to,
      },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  sendMail(): void {
    this.mailerService.sendMail({
      to: 'mqrksimon@gmail.com',
      from: 'no-reply@freshpress.com',
      subject: 'Test email from FreshPress API',
      text: 'Validate your email',
      html: '<button><a>Click this button to validate</a></button>',
    });
  }
}

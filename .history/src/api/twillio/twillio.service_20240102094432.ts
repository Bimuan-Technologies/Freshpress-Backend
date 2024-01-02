import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class TwillioService {
  constructor(
    private readonly twilioService: TwilioService,
  ) {}

  async sendOtpSms(to: string) {
    return this.twilioService.client.messages.create(
      {
        body: 'SMS body, sent to the phone!',
        from: '08034477604',
        to: to,
      },
    );
  }
}

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "AC15f11377ae2a261f4544de9cd4122669";
// const authToken = "04b5fcb07cf01efae7b79218a52776f0";
// const verifySid = "VAb71d40d377a0097b572d65196c7ead0c";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+2348034477604", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+2348034477604", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });

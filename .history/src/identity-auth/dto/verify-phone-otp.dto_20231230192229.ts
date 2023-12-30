/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class VerifyPhoneOtp {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}

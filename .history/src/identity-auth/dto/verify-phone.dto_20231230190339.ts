/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class VerifyPhoneNumber {
  @IsNotEmpty()
  @IsString()
  phone: string;
}

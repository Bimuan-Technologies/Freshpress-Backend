import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  passord: string;
}

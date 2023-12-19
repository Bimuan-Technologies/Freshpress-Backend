import { CreateLocationDto } from './create-address.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
  readonly location: CreateLocationDto;
}

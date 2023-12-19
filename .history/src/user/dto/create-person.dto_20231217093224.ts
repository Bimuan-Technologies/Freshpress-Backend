import { CreateLocationDto } from './create-address.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreatePersonDto {
  // @IsNotEmpty()
  // @IsString()
  username: string;
  // @IsNotEmpty()
  // @IsString()
  firstName: string;
  // @IsNotEmpty()
  // @IsString()
  lastName: string;
  // @IsEmail()
  // @IsNotEmpty()
  email: string;
  // @IsNotEmpty()
  // @IsStrongPassword()
  password: string;
  location: CreateLocationDto;
}

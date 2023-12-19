import { CreateLocationDto } from './create-address.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePersonDto {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  readonly password: string;
  readonly location: CreateLocationDto;
}

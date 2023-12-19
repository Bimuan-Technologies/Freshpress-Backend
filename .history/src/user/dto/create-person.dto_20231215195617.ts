import { CreateLocationDto } from './create-address.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  readonly location: CreateLocationDto;
}

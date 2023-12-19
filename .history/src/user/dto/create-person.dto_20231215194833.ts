import { CreateLocationDto } from './create-address.dto';

export class CreatePersonDto {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly location: CreateLocationDto;
}

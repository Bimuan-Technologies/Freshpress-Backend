import { CreateLocationDto } from './create-address.dto';

export class CreatePersonDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: CreateLocationDto;
}

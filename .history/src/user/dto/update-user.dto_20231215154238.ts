import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-person.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';

export class UpdateUserDto extends PartialType(CreatePersonDto) {}

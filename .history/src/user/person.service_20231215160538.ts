import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(private readonly entityManager: EntityManager) {}

  create(createPersonDto: CreatePersonDto) {
    const person = new Person(createPersonDto);
    this.entityManager.save(person);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

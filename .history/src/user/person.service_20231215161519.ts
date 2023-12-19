import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const person = new Person(createPersonDto);
    await this.entityManager.save(person);
    return 'This action adds a new user';
  }

  async findAll() {
    return this.personsRepository.find();
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

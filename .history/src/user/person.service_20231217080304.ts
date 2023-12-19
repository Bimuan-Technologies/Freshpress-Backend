import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { Person } from '../entity/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../entity/location.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personsRepository: Repository<Person>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const location = new Location({
      ...createPersonDto.location,
    });
    const person = new Person({
      ...createPersonDto,
      location,
    });
    return await this.entityManager.save(person);
  }

  async findAll() {
    return await this.personsRepository.find();
  }

  async findOne(id: number) {
    return await this.personsRepository.findOne({
      where: { id },
      relations: { location: true },
    });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personsRepository.findOneBy({ id });
    // person = { ...person, ...updatePersonDto };
    return await this.entityManager.save(person);
  }

  async remove(id: number) {
    return await this.personsRepository.delete(id);
  }
}

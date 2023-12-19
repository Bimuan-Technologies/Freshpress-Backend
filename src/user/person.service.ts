import { Injectable } from '@nestjs/common';
import {
  CreatePersonDto,
  UpdatePersonDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import {
//   EntityManager,
//   Repository,
// } from 'typeorm';
// import { Person, Location } from '../entity';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    // const location = new Location({
    //   ...createPersonDto.location,
    // });
    // const person = new Person({
    //   ...createPersonDto,
    //   location,
    // });
    // const newUser = await this.personsRepository.create(person);
    // return await this.entityManager.save(person);
    // return await this.personsRepository.save(
    //   person,
    // );
  }

  async findAll() {
    // return await this.personsRepository.find();
  }

  async findOne(id: number) {
    // return await this.personsRepository.findOne({
    //   where: { id },
    //   relations: { location: true },
    // });
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ) {
    // const person =
    // await this.personsRepository.update(
    // { id },
    // updatePersonDto,
    // );
    // person = { ...person, ...updatePersonDto };
    // return person;
  }

  async remove(id: number) {
    //   return await this.personsRepository.delete(
    //     id,
    //   );
    // }
  }
}

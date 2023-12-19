import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from '../entity/person.entity';
import { Location } from '../entity/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Location])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}

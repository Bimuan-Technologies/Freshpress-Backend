import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from '../entity/person.entity';
import { Location } from '../entity/location.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Location]), DatabaseModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}

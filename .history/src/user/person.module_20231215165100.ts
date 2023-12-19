import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from './entities/person.entity';
import { Address } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Address])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}

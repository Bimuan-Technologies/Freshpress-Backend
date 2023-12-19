import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './person.service';
import { UserController } from './person.controller';
import { Person } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

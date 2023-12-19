import { BaseEntity, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

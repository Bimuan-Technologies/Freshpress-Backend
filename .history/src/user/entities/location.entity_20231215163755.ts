/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  zipCode?: string;
}

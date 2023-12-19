/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shopNo?: string;

  @Column()
  edificeNo?: string;

  @Column()
  streetName: string;

  @Column()
  cityTownname: string;

  @Column()
  lga: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  zipCode?: string;
}
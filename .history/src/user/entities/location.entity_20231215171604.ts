/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  shopNo?: string;

  @Column()
  edificeNo?: string;

  @Column()
  streetName: string;

  @Column()
  cityTownName: string;

  @Column()
  lga: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  zipCode?: string;

  constructor(location: Partial<Location>) {
    super();
    Object.assign(this, location);
  }
}

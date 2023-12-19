/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  shopNo?: string;

  @Column({ default: null })
  edificeNo?: string;

  @Column({ default: '' })
  streetName: string;

  @Column({ default: '' })
  cityTownName: string;

  @Column({ default: '' })
  lga: string;

  @Column({ default: '' })
  state: string;

  @Column({ nullable: true })
  zipCode?: string;

  constructor(location: Partial<Location>) {
    super();
    Object.assign(this, location);
  }
}

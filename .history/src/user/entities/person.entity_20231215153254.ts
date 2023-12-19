import { Subscription } from './../constants/constant.enum';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {
  Gender,
  PersonRole,
  Subscription,
  UserRole,
} from '../constants/constant.enum';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  zipCode?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'text', nullable: true })
  profileImage?: string;

  @Column({ default: false })
  isSuspended: boolean;

  @Column({ default: false })
  isKYCDone: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: PersonRole, default: PersonRole.CUSTOMER })
  role: PersonRole;

  @Column({ type: 'enum', enum: Subscription, default: Subscription.FREE })
  subscription: Subscription;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  businessName?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  constructor(person: Partial<Person>) {
    super();
    Object.assign(this, person);
  }
}

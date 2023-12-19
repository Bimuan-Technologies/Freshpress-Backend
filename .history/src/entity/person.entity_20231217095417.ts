import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  Gender,
  PersonRole,
  Subscription,
} from '../user/constants/constant.enum';
import { Location } from '.';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: '' })
  username: string;

  @Column({ default: '' })
  // @Exclude()
  password: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true, default: '' })
  email: string;

  @Column({
    unique: true,
    nullable: true,
    default: '',
  })
  phoneNumber?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ type: 'text', nullable: true })
  profileImage?: string;

  @Column({ default: false })
  isSuspended: boolean;

  @Column({ default: false })
  isKYCDone: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: PersonRole,
    default: PersonRole.CUSTOMER,
  })
  role: PersonRole;

  @Column({
    type: 'enum',
    enum: Subscription,
    default: Subscription.FREE,
  })
  subscription: Subscription;

  @OneToOne(() => Location, { cascade: true })
  @JoinColumn()
  location?: Location;

  @Column({ nullable: true, default: null })
  imei?: string;

  @Column({ nullable: true, default: null })
  businessName?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
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

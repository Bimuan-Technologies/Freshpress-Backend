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

  @Column({ unique: true, default: null })
  username: string | null;

  @Column({ default: null, nullable: true })
  // @Exclude()
  password: string | null;

  @Column({ default: null, nullable: true })
  firstName: string;

  @Column({ default: null, nullable: true })
  lastName: string | null;

  @Column({
    unique: true,
    default: null,
    nullable: true,
  })
  email: string | null;

  @Column({
    unique: true,
    nullable: true,
    default: null,
  })
  phoneNumber?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
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

/* eslint-disable prettier/prettier */
import {
  Gender,
  PersonRole,
} from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class ProfileDto {
  @IsOptional()
  @IsString()
  preferredName?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  otherName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsBoolean()
  hasRegisteredBusiness?: boolean;

  @IsOptional()
  @IsBoolean()
  isUpgradedAccount?: boolean;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  transactionPin?: string;

  @IsOptional()
  @IsEnum(PersonRole)
  role?: PersonRole;

  @IsOptional()
  @IsString()
  refereeCode?: string;

  @IsOptional()
  @IsString()
  referralCode?: string;
}

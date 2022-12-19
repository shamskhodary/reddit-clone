import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDateString,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { string } from 'joi';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'password should be at least 6 characters' })
  @MaxLength(15, { message: 'password is too long' })
  password: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsOptional()
  profileImg?: string;

  @IsString()
  @IsOptional()
  biography?: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

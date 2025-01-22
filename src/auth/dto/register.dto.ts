import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid Email' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description:
      'Password with at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and more than 8 characters',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\s]).{8,}$/, {
    message:
      'Invalid Password: Password should have at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 digit, and more than 8 characters',
  })
  password: string;

  @ApiProperty({
    example: false,
    description: 'Flag to indicate if the user registered via social login',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  socialLogin?: boolean;

  @ApiProperty({
    example: false,
    description: 'Flag to indicate if two-factor authentication is enabled',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;

  @ApiProperty({
    example: false,
    description: 'Flag to indicate if onboarding has been completed',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  onboardingCompleted?: boolean;

  @ApiProperty({
    example: false,
    description: 'Subscribe to our newsletter',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  subscription?: boolean;
}

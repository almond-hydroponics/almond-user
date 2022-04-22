import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
	readonly id?: string;

  @IsString()
	readonly firstName?: string;

  @IsString()
	readonly lastName?: string;

  @IsEmail()
	readonly email?: string;

  @IsString()
  @MinLength(8)
	readonly password?: string;

  @IsString()
  readonly photo?: string;

	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly version?: number;
}
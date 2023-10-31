import { IsEmail, IsString } from 'class-validator';

export class ResetVerifyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}

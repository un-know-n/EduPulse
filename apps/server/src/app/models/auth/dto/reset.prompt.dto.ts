import { IsEmail, IsString } from 'class-validator';

export class ResetPromptDto {
  @IsString()
  @IsEmail()
  email: string;
}

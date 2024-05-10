import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, ['name', 'password', 'role'] as const),
) {
  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string;
}

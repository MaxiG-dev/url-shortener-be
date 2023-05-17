import {
  IsBoolean,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsIn,
  IsArray,
} from 'class-validator';
import { FolderDto } from './folder.dto';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  email: string;

  @IsArray()
  @IsOptional()
  folders?: FolderDto[];

}

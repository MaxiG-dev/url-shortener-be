import {
  IsBoolean,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsIn,
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

  @IsString()
  @IsIn(['admin', 'mod', 'user', 'guest'])
  role: string;

  createDate: Date;

  lastLogin?: Date;

  folders: FolderDto[];

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  isPremium: boolean;
}

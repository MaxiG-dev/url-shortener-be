import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FolderDto {
  @IsString()
  title: string;

  @IsString({ each: true })
  urls?: string[];

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @IsBoolean()
  isDeleted: boolean;
}

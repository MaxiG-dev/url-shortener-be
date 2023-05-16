import { IsOptional, IsString } from 'class-validator';
export class CreateUrlDto {
  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

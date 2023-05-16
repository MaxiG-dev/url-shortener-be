import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateFolderDto {

    @IsString()
    @MinLength(3)
    @IsOptional()
    title?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    urlIds?: string[];

}

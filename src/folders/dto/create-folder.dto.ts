import { IsArray, IsOptional, IsString, MinLength } from "class-validator";

export class CreateFolderDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    urlIds?: string[];
}

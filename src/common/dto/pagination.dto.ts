import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class PaginationDTO {
  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number;

  @IsBoolean()
  @IsOptional()
  withDeleted?: boolean;

  @IsOptional()
  @IsString()
  orderColumnName?: string;

  @IsOptional()
  @IsString()
  @IsIn(["ASC", "DESC"])
  orderBy?: "ASC" | "DESC";
}

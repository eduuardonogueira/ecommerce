import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class PaginationProductsDto {
  @IsOptional()
  @IsEmpty()
  @Length(1, 50)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category: string;

  @Transform(({ value }) => Boolean(value))
  @IsOptional()
  @IsBoolean()
  isNew: boolean;

  @Transform(({ value }) => Boolean(value))
  @IsOptional()
  @IsBoolean()
  hasDiscount: boolean;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  pageSize: number;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}

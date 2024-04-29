import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsInt,
  IsNumber,
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
  @IsEmpty()
  @Length(1, 10)
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  category: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsInt()
  categoryId: number;

  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  @Min(0.01)
  @IsNumber()
  price: number;

  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  @Min(0.01)
  @IsNumber()
  discountPrice: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsInt()
  discountPercent: number;

  @Transform(({ value }) => Boolean(value))
  @IsOptional()
  @IsBoolean()
  isNew: boolean;

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

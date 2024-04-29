import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsEmpty()
  @Length(1, 50)
  @IsString()
  name: string;

  @IsEmpty()
  @Length(1, 10)
  @IsString()
  sku: string;

  @IsNumber()
  categoryId: number;

  @IsEmpty()
  @Length(1, 250)
  @IsString()
  description: string;

  @IsEmpty()
  @Length(1, 500)
  @IsString()
  largeDescription: string;

  @IsOptional()
  @Min(0.01)
  @IsDecimal({ decimal_digits: '2', force_decimal: true, locale: 'pt-BR' })
  price: number;

  @IsOptional()
  @IsDecimal()
  discountPrice: number;

  @IsOptional()
  @IsInt()
  discountPercent: number;

  @IsOptional({})
  @IsBoolean()
  isNew: boolean;

  @IsOptional()
  @Length(1, 250)
  @IsUrl()
  imageLink: string;

  @IsOptional()
  @Length(1, 1000)
  @IsArray()
  @IsUrl({}, { each: true }) // Recebe dois parametros: options and validationOptions
  otherImagesLink: string[];
}

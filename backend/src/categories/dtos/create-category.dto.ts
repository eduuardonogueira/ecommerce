import { IsEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageLink: string;
}

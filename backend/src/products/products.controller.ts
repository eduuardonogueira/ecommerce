import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { PaginationProductsDto } from './dtos/pagination-products.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('product')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/register')
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Get()
  getProducts(
    @Query(new ValidationPipe({ transform: true }))
    paginationProductsDto: PaginationProductsDto,
  ) {
    return this.productsService.findAll(paginationProductsDto);
  }

  @Get('/:id')
  findProduct(@Param('id') id: string) {
    return this.productsService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.remove(parseInt(id));
  }
}

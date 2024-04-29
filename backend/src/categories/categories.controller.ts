import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('category')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAllCategorys() {
    const categories = await this.categoriesService.getAll();
    return categories;
  }

  @Get('/:id')
  async findCategory(@Param('id') id: string) {
    return this.categoriesService.findOne(parseInt(id));
  }

  @Post('/register')
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create({ ...body });
  }

  // Patch

  @Delete('/:id')
  async removeCategory(@Param('id') id: string) {
    return this.categoriesService.remove(parseInt(id));
  }
}

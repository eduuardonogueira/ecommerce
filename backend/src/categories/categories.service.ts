import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const categories = await this.prisma.category.findMany();
    if (!categories) {
      throw new NotFoundException('categories not found');
    }
    return categories;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  async create({ ...data }: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return this.prisma.category.delete({ where: { id: category.id } });
  }
}

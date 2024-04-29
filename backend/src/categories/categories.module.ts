import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  exports: [CategoriesService],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
})
export class CategorysModule {}

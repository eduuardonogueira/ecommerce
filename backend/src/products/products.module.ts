import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategorysModule } from 'src/categories/categories.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [CategorysModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}

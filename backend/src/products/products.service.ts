import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

interface IProductsFilter {
  page: number;
  pageSize: number;
  category?: string;
  isNew?: boolean;
  hasDiscount?: boolean;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page,
    pageSize,
    category,
    isNew,
    hasDiscount,
  }: IProductsFilter) {
    const products = await this.prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        isNew,
        ...(hasDiscount === true ? { discountPercent: { gt: 0 } } : {}),
        category: { name: { contains: category, mode: 'insensitive' } },
      },
      include: { category: true },
    });

    if (!products) {
      throw new NotFoundException('Products not found');
    }

    const total = await this.prisma.product.count({
      where: {
        isNew,
        ...(hasDiscount === true ? { discountPercent: { gt: 0 } } : {}),
        category: { name: { contains: category, mode: 'insensitive' } },
      },
    });
    const pageQty = Math.ceil(total / pageSize);

    return {
      products,
      pagination: { page, pageSize, pageQty, total },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.delete({ where: { id: product.id } });
  }
}

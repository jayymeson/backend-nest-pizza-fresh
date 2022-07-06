import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle-error.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product
      .create({ data: createProductDto })
      .catch(handleErrorConstraintUnique);
  }

  async verifyingTheUser(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return product;
  }

  findOne(id: string): Promise<Product> {
    return this.verifyingTheUser(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    await this.verifyingTheUser(id);
    return this.prisma.product
      .update({
        where: { id },
        data: updateProductDto,
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyingTheUser(id);
    return this.prisma.product.delete({ where: { id } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle-error.util';
import { CreateProductDto } from './dto/create-product.dto';
import { FavoriteProductDto } from '../favorite/dto/favorite.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Favorite } from 'src/favorite/entities/favortite.entity';
import { Prisma, User } from '@prisma/client';

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

  async verifyingTheProduct(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return product;
  }

  findOne(id: string): Promise<Product> {
    return this.verifyingTheProduct(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    await this.verifyingTheProduct(id);
    return this.prisma.product
      .update({
        where: { id },
        data: updateProductDto,
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyingTheProduct(id);
    return this.prisma.product.delete({ where: { id } });
  }

  async favorite(favoriteProductDto: FavoriteProductDto): Promise<Favorite> {
    const product: Product = await this.prisma.product.findUnique({
      where: { name: favoriteProductDto.productName },
    });

    if (!product) {
      throw new NotFoundException(
        `Product of name '${favoriteProductDto.productName}' not found`,
      );
    }

    const user: User = await this.prisma.user.findUnique({
      where: { id: favoriteProductDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Id '${favoriteProductDto.userId}' not found`,
      );
    }

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: favoriteProductDto.userId,
        },
      },
      product: {
        connect: {
          name: favoriteProductDto.productName,
        },
      },
    };

    return this.prisma.favorite.create({ data });
  }

  async unfavorite(id: string) {
    await this.verifyingTheProduct(id);
    return this.prisma.favorite.delete({ where: { id: id } });
  }

  async findUsersLiked(id: string) {
    const product: Product = await this.verifyingTheProduct(id);

    return this.prisma.favorite.findMany({
      where: { productName: product.name },
      select: {
        product: true,
        user: { select: { id: true, nickname: true, email: true } },
      },
    });
  }
}

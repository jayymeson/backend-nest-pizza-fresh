import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { handleErrorConstraintUnique } from 'src/utils/handle-error.util';

@Injectable()
export class CategoriesService {
  userSelect: any;
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.prisma.category.create({ data: createCategoryDto });
    } catch (error) {
      return handleErrorConstraintUnique(error);
    }
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async verifyingTheCategory(id: string): Promise<Category> {
    const category: Category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return category;
  }

  findOne(id: string): Promise<Category> {
    return this.verifyingTheCategory(id);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | void> {
    await this.verifyingTheCategory(id);

    return this.prisma.category
      .update({
        where: { id: id },
        data: updateCategoryDto,
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyingTheCategory(id);
    return this.prisma.category.delete({
      where: { id: id },
      select: { name: true },
    });
  }
}

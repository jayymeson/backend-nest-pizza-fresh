import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDTO } from './dto/create.users.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/updated.user.dto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error.util';

@Injectable()
export class UsersService {
  private userSelect = {
    id: true,
    nickname: true,
    email: true,
    password: false,
    age: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: { ...this.userSelect, favorites: true },
    });
  }

  async create(createUsersDto: CreateUsersDTO): Promise<User> {
    const hashPassword = await bcryptjs.hash(createUsersDto.password, 8);
    const data: CreateUsersDTO = {
      nickname: createUsersDto.nickname,
      email: createUsersDto.email,
      password: hashPassword,
      age: createUsersDto.age,
    };

    const hasSpace: boolean = ''.includes(' ');

    if (hasSpace) {
      console.log('Invalid Nickname');
    }

    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleErrorConstraintUnique);
  }

  async verifyingTheUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
      select: { ...this.userSelect, favorites: true },
    });

    if (!user) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return user;
  }

  findOne(id: string): Promise<User> {
    return this.verifyingTheUser(id);
  }

  async findFavoriteProducts(id: string) {
    await this.verifyingTheUser(id);
    return this.prisma.favorite.findMany({ where: { userId: id } });
  }

  async update(
    id: string,
    createUsersDto: UpdateUserDto,
  ): Promise<User | void> {
    await this.verifyingTheUser(id);

    return this.prisma.user
      .update({ where: { id }, data: createUsersDto, select: this.userSelect })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyingTheUser(id);

    return this.prisma.user.delete({
      where: { id: id },
      select: this.userSelect,
    });
  }
}

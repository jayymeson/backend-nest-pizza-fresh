import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDTO } from './dto/create.users.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/updated.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  create(createUsersDto: CreateUsersDTO): Promise<User> {
    const hashPassword = bcryptjs.hashSync(createUsersDto.password, 8);
    const data: CreateUsersDTO = {
      nickname: createUsersDto.nickname,
      email: createUsersDto.email,
      password: hashPassword,
      age: createUsersDto.age,
    };
    return this.prisma.user.create({ data });
  }
  findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
  delete(id: string) {
    return this.prisma.user.delete({
      where: { id: id },
      select: { nickname: true, email: true },
    });
  }
  update(id: string, createUsersDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: createUsersDto });
  }
}

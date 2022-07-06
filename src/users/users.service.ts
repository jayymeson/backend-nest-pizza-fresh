import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  async create(createUsersDto: CreateUsersDTO): Promise<User | void> {
    const hashPassword = await bcryptjs.hash(createUsersDto.password, 8);
    const data: CreateUsersDTO = {
      nickname: createUsersDto.nickname,
      email: createUsersDto.email,
      password: hashPassword,
      age: createUsersDto.age,
    };

    return this.prisma.user
      .create({ data })
      .catch(this.handleErrorConstraintUnique);
  }

  async verifyingTheUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return user;
  }

  handleErrorConstraintUnique(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMessage = `Input '${
      splitedMessage[splitedMessage.length - 2]
    }' is not respecting the UNIQUE constraint  `;

    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<User> {
    return this.verifyingTheUser(id);
  }

  async update(
    id: string,
    createUsersDto: UpdateUserDto,
  ): Promise<User | void> {
    await this.verifyingTheUser(id);

    return this.prisma.user
      .update({ where: { id }, data: createUsersDto })
      .catch(this.handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyingTheUser(id);

    return this.prisma.user.delete({
      where: { id: id },
      select: { nickname: true, email: true },
    });
  }
}

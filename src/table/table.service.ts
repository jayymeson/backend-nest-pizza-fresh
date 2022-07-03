import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDTO } from './dto/create-table.dto';
import { Tables } from './entities/table.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Tables[]> {
    return this.prisma.table.findMany();
  }

  create(createTableDto: CreateTableDTO): Promise<Tables> {
    return this.prisma.table.create({ data: createTableDto });
  }

  async verifyingTheUser(id: string): Promise<Tables> {
    const tables: Tables = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!tables) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return tables;
  }

  findOne(id: string): Promise<Tables> {
    return this.verifyingTheUser(id);
  }

  async remove(id: string) {
    await this.verifyingTheUser(id);

    return this.prisma.table.delete({ where: { id: id } });
  }
}

import { Injectable } from '@nestjs/common';
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
  findOne(id: string): Promise<Tables> {
    return this.prisma.table.findUnique({ where: { id: id } });
  }
  remove(id: string) {
    return this.prisma.table.delete({ where: { id: id } });
  }
}

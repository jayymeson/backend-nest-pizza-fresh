import { Injectable } from '@nestjs/common';
import { CreateTableDTO } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { uuid } from 'uuidv4';

@Injectable()
export class TableService {
  findAll(): Table[] {
    return this.tables;
  }

  tables: Table[] = [];

  create(createTableDto: CreateTableDTO) {
    const newTable: Table = { id: uuid(), ...createTableDto };
    this.tables.push(newTable);

    return newTable;
  }
}

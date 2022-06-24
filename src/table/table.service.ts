import { Injectable } from '@nestjs/common';
import { CreateTableDTO } from './dto/create-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  tables: Table[] = [];

  create(createTableDto: CreateTableDTO) {
    const table: Table = { id: 'ramdon_id', ...createTableDto };
    this.tables.push(table);

    return table;
  }

  findAll() {
    return 'Find all tables';
  }
}

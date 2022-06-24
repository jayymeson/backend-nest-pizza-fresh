import { Injectable } from '@nestjs/common';
import { CreateTableDTO } from './dto/create-table.dto';

@Injectable()
export class TableService {
  create(createTableDto: CreateTableDTO) {
    return 'Create one table' + JSON.stringify(createTableDto);
  }
  findAll() {
    return 'Find all tables';
  }
}

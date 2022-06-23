import { Injectable } from '@nestjs/common';

@Injectable()
export class TableService {
  create() {
    return 'Create one table';
  }
  findAll() {
    return 'Find all tables';
  }
}

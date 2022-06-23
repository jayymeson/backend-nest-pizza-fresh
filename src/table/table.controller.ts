import { Controller, Get, Post } from '@nestjs/common';

@Controller('table')
export class TableControllers {
  @Get()
  findAll() {
    return 'Find all tables';
  }

  @Post()
  create() {
    return 'Create one table';
  }
}

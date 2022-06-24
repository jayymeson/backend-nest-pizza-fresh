import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTableDTO } from './dto/create-table.dto';
import { TableService } from './table.service';

@Controller('table')
export class TableControllers {
  constructor(private tableService: TableService) {}

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Post()
  create(@Body() createTableDto: CreateTableDTO) {
    return this.tableService.create(createTableDto);
  }
}

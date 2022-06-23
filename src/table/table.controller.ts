import { Controller, Get } from '@nestjs/common';

@Controller('table')
export class TableControllers {
  @Get()
  findAll() {
    return 'Find all tables';
  }
}

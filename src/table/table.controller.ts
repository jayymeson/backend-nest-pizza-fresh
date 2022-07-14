import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTableDTO } from './dto/create-table.dto';
import { TableService } from './table.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Tables } from './entities/table.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('table')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('table')
export class TableControllers {
  constructor(private tableService: TableService) {}

  @Get()
  @ApiOperation({
    summary: 'Find all tables',
  })
  findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find by id tables',
  })
  findById(@Param('id') id: string): Promise<Tables> {
    return this.tableService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create tables',
  })
  create(@Body() createTableDto: CreateTableDTO): Promise<Tables> {
    return this.tableService.create(createTableDto);
  }
  delete(@Param('id') id: string) {
    return this.tableService.remove(id);
  }
}

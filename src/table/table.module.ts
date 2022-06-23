import { Module } from '@nestjs/common';
import { TableControllers } from './table.controller';
import { TableService } from './table.service';

@Module({
  controllers: [TableControllers],
  providers: [TableService],
})
export class TableModule {}

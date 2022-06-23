import { Module } from '@nestjs/common';
import { TableControllers } from './table.controller';

@Module({
  controllers: [TableControllers],
  providers: [],
})
export class TableModule {}

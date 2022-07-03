import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TableControllers } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [PrismaModule],
  controllers: [TableControllers],
  providers: [TableService],
})
export class TableModule {}

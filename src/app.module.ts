import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TableModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

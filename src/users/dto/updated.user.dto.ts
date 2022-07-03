import { PartialType } from '@nestjs/swagger';
import { CreateTableDTO } from 'src/table/dto/create-table.dto';

export class UpdateUserDto extends PartialType(CreateTableDTO) {}

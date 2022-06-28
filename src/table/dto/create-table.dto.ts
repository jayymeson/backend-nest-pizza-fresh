import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDTO {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Number of table.',
    example: 1,
  })
  number: number;
}

import { IsNumber, IsPositive } from 'class-validator';

export class CreateTableDTO {
  @IsNumber()
  @IsPositive()
  number: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'User ID creating the order',
    example: 'e1bc0c89-a319-44df-a6e9-db66fe7b956b',
  })
  productId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Quantity of items in order',
    example: 2,
  })
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of product',
    example: 'Pizza of Shrimp',
  })
  description: string;
}
